import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { servicesPromise } from "./Services";

const ServiceDetail = () => {
  const { _id } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesPromise
      .then((services) => {
        const selected = services.find((s) => s._id === _id);
        setService(selected);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service:", error);
        setLoading(false);
      });
  }, [_id]);

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

  return (
    <div className="p-10 flex justify-center">
      <div className="card bg-base-100 w-[700px] shadow-md hover:shadow-lg transition-all flex flex-col md:flex-row">
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
              <p className="text-sm font-semibold text-gray-700">Provider Info:</p>
              <p className="text-sm text-gray-600">Name: {service.providerName}</p>
              <p className="text-sm text-gray-600">Email: {service.providerEmail}</p>
            </div>
          </div>

          <button className="btn btn-primary w-full">Book Now</button>
          
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
