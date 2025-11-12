import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-center mb-10">
        My <span className="text-primary">Bookings</span>
      </h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="table-auto w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Service ID</th>
                <th className="px-4 py-2 text-left">Booking Date</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-2">{booking.serviceId}</td>
                  <td className="px-4 py-2">{booking.bookingDate}</td>
                  <td className="px-4 py-2">{booking.price} BDT</td>
                  <td className="px-4 py-2 text-left">
                    <button
                      className="bg-purple-700 hover:bg-teal-700 text-white px-3 py-1 rounded"
                      onClick={() =>
                        console.log("Cancel booking:", booking._id)
                      } // later implement delete
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
