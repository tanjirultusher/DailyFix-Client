import React from "react";
import { FaGift } from "react-icons/fa";

const DiscountBanner = () => {
  return (
    <section className="relative w-full h-50 bg-gradient-to-r from-blue-300 to-purple-400 text-white flex flex-col items-center justify-center shadow-2xl overflow-hidden">
      
      <div className="absolute inset-0 opacity-10 bg-cover bg-center"></div>
      <div className="relative z-10 text-center px-4">
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 flex items-center gap-3 justify-center">
          <FaGift className="text-yellow-300 animate-bounce" />
          Big Holiday Offer
        </h2>
        <p className="text-xl md:text-2xl mb-6 text-white/90">
          Enjoy up to{" "}
          <span className="font-bold text-yellow-300">50% OFF</span> on any Service this weekend only!
        </p>
      </div>
    </section>
  );
};

export default DiscountBanner;
