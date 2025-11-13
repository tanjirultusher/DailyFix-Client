import React from "react";
import { Facebook, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner rounded-t-xl text-black pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center pb-4 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold">
              daily<span className="text-primary">FIX</span>
            </h2>
            <p className="text-gray-700 text-md mt-2">
              dailyFIX – Local Household Service Finder.
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-3 text-primary">
              Connect With Us
            </h4>
            <div className="flex justify-center md:justify-end space-x-5">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-700 hover:text-primary transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-gray-700 hover:text-primary transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-gray-700 hover:text-primary transition-colors duration-300"
              >
                <Github size={24} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-gray-700 hover:text-primary transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-700">
          <p>
            &copy; {new Date().getFullYear()} <span className="text-primary font-semibold">dailyFIX</span>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
