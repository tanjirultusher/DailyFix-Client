import React, { useState, useEffect } from "react";
import { servicesPromise } from "../Pages/Services";
import { Link } from "react-router-dom";

const PopularServices = () => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesPromise
      .then((data) => {
        setServices(data.slice(0, 6)); 
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching services:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading popular services...</div>;
  }

  return (
    <div>
      <h2 className="text-4xl font-bold text-center m-6">
        Our <span className="text-primary">Services</span>
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center p-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 w-96 shadow-sm hover:shadow-lg transition-all"
          >
            <figure className="px-10 pt-10">
              <img
                src={service.image || "https://i.ibb.co/4pDNDk1/default.jpg"}
                alt={service.serviceTitle}
                className="rounded-xl h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{service.serviceTitle}</h2>
              <p className="text-gray-600 text-sm">{service.description}</p>
              <Link to={`/service/${service._id}`}>
                <div className="card-actions mt-4">
                  <button className="btn btn-primary btn-sm">View Details</button>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularServices;