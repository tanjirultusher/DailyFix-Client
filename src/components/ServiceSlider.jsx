import React, { useEffect, useState, useRef } from "react";
import { servicesPromise } from "../Pages/Services";

const ServiceSlider = () => {
  const [services, setServices] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    servicesPromise
      .then((data) => {
        const limited = data.slice(0, 4);
        setServices(limited);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  useEffect(() => {
    if (services.length === 0) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 3000); 

    return () => clearInterval(intervalRef.current);
  }, [services]);

  return (
    <div className="w-full relative">
      <div className="carousel w-full">
        {services.map((service, index) => (
          <div
            key={service._id}
            id={`item${index + 1}`}
            className={`carousel-item w-full transition-all duration-500 ${
              index === activeIndex ? "block" : "hidden"
            }`}
          >
            <div className="w-full h-[400px] md:h-[500px] bg-white overflow-hidden flex items-center justify-center border border-gray-200">
              <img
                src={service.image || "https://i.ibb.co/4pDNDk1/default.jpg"}
                alt={service.serviceTitle}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex w-full justify-center gap-2 py-4">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`btn btn-xs ${activeIndex === index ? "btn-primary" : ""}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSlider;
