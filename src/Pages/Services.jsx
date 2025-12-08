import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const servicesPromise = fetch("https://dailyfix-server.vercel.app/services").then((res) =>
  res.json()
);

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Services";
    setLoading(true);
    servicesPromise
      .then((data) => {
        console.log("Fetched services:", data);
        setServices(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center text-lg font-medium p-6">
        Loading services...
      </div>
    );
  }

  return (
    <div className="mb-10 px-6">
      <h2 className="text-4xl font-bold text-center mt-6 mb-2">
        Our <span className="text-primary">Services</span>
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center p-2">
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
              <p className="text-gray-500 text-sm">{service.description}</p>
              <Link to={`/service/${service._id}`}>
                <div className="card-actions mt-1">
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

export default Services;
