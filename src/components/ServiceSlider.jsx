import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { servicesPromise } from "../Pages/Services";

const ServiceSlider = () => {
  const [services, setServices] = useState([]);
  const paginationElRef = useRef(null);

  useEffect(() => {
    servicesPromise
      .then((data) => {
        const limited = data.slice(0, 3); 
        setServices(limited);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  return (
    <div id="service-slider" className="relative mx-auto w-full h-full p-10">
      <Swiper
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
          el: paginationElRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.pagination.el = paginationElRef.current;
        }}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        speed={800} 
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 10 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 30 },
        }}
        modules={[Pagination, Autoplay]}
        className="w-full py-8"
      >
        {services.map((service) => (
          <SwiperSlide
            key={service._id}
            className="w-full h-[350px] md:h-[400px] md:w-[280px]"
          >
            <div className="w-full h-full bg-white border border-gray-200 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex flex-col">
              <div className="relative w-full h-[70%] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.serviceTitle}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-3 flex-1 flex flex-col justify-center text-center">
                <h3 className="text-gray-800 text-lg font-bold line-clamp-1">
                  {service.serviceTitle}
                </h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        ref={paginationElRef}
        className="swiper-pagination mt-4 flex items-center justify-center"
      ></div>
    </div>
  );
};

export default ServiceSlider;
