import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { servicesPromise } from "./Services";
import Swal from "sweetalert2";
import { AuthContext } from "../contexts/AuthContext";
import { FaStar } from "react-icons/fa";

const ServiceDetail = () => {
  const { _id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const bookingModalRef = useRef(null);
  const { user } = useContext(AuthContext);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    document.title = "Service Details";
    servicesPromise
      .then((services) => {
        const selected = services.find((s) => s._id === _id);
        setService(selected);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [_id]);

  useEffect(() => {
    if (!service) return;

    fetch("https://dailyfix-server.vercel.app/bookings")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter(
          (item) =>
            item.serviceTitle === service.serviceTitle && item.rating > 0
        );
        setReviews(filtered);
      });
  }, [service]);

  if (loading) {
    return (
      <div className="text-center text-lg font-medium p-6">
        Loading service details...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center text-lg font-medium p-6">
        Service not found.
      </div>
    );
  }

  const handleBookingModalOpen = () => {
    if (user?.email === service.providerEmail) {
      Swal.fire({
        title: "Not Allowed!",
        text: "You cannot book your own service.",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
      return;
    }
    bookingModalRef.current.showModal();
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const newBooking = {
      userEmail: user?.email,
      serviceTitle: service.serviceTitle,
      image: service.image,
      serviceId: service._id,
      review,
      rating: Number(rating),
      bookingDate: new Date().toISOString().split("T")[0],
      price: service.minPrice,
      status: "pending",
    };

    fetch("https://dailyfix-server.vercel.app/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBooking),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          title: "Booking Successful!",
          text: "Your booking request has been sent.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
        bookingModalRef.current.close();
        setReview("");
        setRating(0);
      })
      .catch(() => {
        Swal.fire({
          title: "Error!",
          text: "Failed to place booking. Try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="p-10 flex justify-center">
      <div className="card bg-base-100 w-full shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row">
        <figure className="md:w-1/2 p-6 flex justify-center items-center">
          <img
            src={service.image}
            alt={service.serviceTitle}
            className="rounded-xl h-64 w-full object-cover"
          />
        </figure>

        <div className="card-body md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="card-title text-2xl">{service.serviceTitle}</h2>
            <p className="text-gray-600 my-2">{service.description}</p>
            <p className="text-sm text-primary font-medium mb-1">
              Category: {service.category}
            </p>
            <p className="text-sm font-medium text-primary mb-2">
              Price: {service.minPrice} - {service.maxPrice} BDT
            </p>

            <div className="border-t border-gray-200 pt-2 mt-2 w-full">
              <p className="text-sm font-semibold text-gray-700">
                Provider Info:
              </p>
              <p className="text-sm text-gray-600">
                Name: {service.providerName}
              </p>
              <p className="text-sm text-gray-600">
                Email: {service.providerEmail}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={handleBookingModalOpen}
              className="btn btn-primary w-full"
            >
              Book Now
            </button>

            <dialog
              ref={bookingModalRef}
              className="modal modal-bottom sm:modal-middle"
            >
              <div className="modal-box">
                <h3 className="font-bold text-lg mb-2">Confirm Your Booking</h3>
                <form onSubmit={handleBookingSubmit}>
                  <fieldset className="fieldset space-y-3">
                    <label className="label">User Email</label>
                    <input
                      type="email"
                      name="email"
                      className="input w-full"
                      value={user?.email || ""}
                      readOnly
                    />

                    <label className="label">Service Tilte</label>
                    <input
                      type="text"
                      name="serviceTitle"
                      className="input w-full"
                      value={service.serviceTitle || ""}
                      readOnly
                    />

                    <label className="label">Service Image</label>
                    <input
                      type="text"
                      name="service Image"
                      className="input w-full"
                      value={service.image || ""}
                      readOnly
                    />

                    <label className="label">Service ID</label>
                    <input
                      type="text"
                      name="serviceId"
                      className="input w-full"
                      value={service._id}
                      readOnly
                    />

                    <label className="label">Review</label>
                    <input
                      type="text"
                      name="review"
                      className="input w-full"
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                    />

                    <label className="label">Rating</label>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={24}
                          className="cursor-pointer"
                          color={
                            (hoverRating || rating) >= star
                              ? "#ffc107"
                              : "#e4e5e9"
                          }
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                    </div>

                    <label className="label">Booking Date</label>
                    <input
                      type="text"
                      name="bookingDate"
                      className="input w-full"
                      value={new Date().toISOString().split("T")[0]}
                      readOnly
                    />

                    <label className="label">Price</label>
                    <input
                      type="text"
                      name="price"
                      className="input w-full"
                      value={`${service.minPrice} BDT`}
                      readOnly
                    />

                    <label className="label">Status</label>
                    <input
                      type="text"
                      name="status"
                      className="input w-full"
                      value="pending"
                      readOnly
                    />

                    <button
                      type="submit"
                      className="btn btn-primary w-full mt-4"
                    >
                      Confirm Booking
                    </button>
                  </fieldset>
                </form>

                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Cancel</button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>

        <div className="pt-6 px-6">
          <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>

          {reviews.length === 0 && (
            <p className="text-gray-500">
              No reviews available for this service.
            </p>
          )}

          <div className="mt-4">
            {reviews.map((rev) => (
              <div
                key={rev._id}
                className="rounded-lg p-2 mb-2 bg-gray-50 shadow-sm"
              >
                <p className="text-primary">{rev.userEmail}</p>

                <div className="flex items-center my-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      size={20}
                      color={rev.rating >= star ? "#ffc107" : "#e4e5e9"}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-700">{rev.review || "No review"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
