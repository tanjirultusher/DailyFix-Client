import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyServices = () => {
  const { user, loading } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      setLoadingServices(true);

      fetch("http://localhost:3000/services")
        .then((res) => res.json())
        .then((data) => {
          const myServices = data.filter(
            (service) => service.providerEmail === user.email
          );
          setServices(myServices);
          setLoadingServices(false);
        })
        .catch((err) => {
          console.error("Error fetching services:", err);
          setLoadingServices(false);
        });
    }
  }, [loading, user]);

  if (loading || loadingServices) {
    return (
      <div className="text-center p-6 text-lg font-medium">
        Loading your services...
      </div>
    );
  }

  if (!services.length) {
    return (
      <div className="text-center p-6 text-lg font-medium">
        You have not added any services yet.
      </div>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold text-center mb-10">
        My <span className="text-primary">Services</span>
      </h2>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {services.map((service) => (
          <div
            key={service._id}
            className="card bg-base-100 w-96 shadow-md hover:shadow-lg transition-all"
          >
            <figure className="px-10 pt-10">
              <img
                src={
                  service.image ||
                  "https://i.ibb.co/4pDNDk1/default.jpg"
                }
                alt={service.serviceTitle}
                className="rounded-xl h-56 w-full object-cover"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">{service.serviceTitle}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {service.description}
              </p>
              <p className="text-sm font-medium text-primary mb-2">
                Price: {service.minPrice} - {service.maxPrice} BDT
              </p>
              <div className="flex gap-3 mt-4">
                <button className="btn btn-primary btn-sm">
                  Update Service
                </button>
                <button className="btn btn-secondary btn-sm">
                  Delete Service
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyServices;
