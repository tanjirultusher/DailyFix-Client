import React from "react";
import { Facebook, X, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="pt-10 pb-6 shadow-t">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center pb-4 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold">
              daily<span className="text-primary">FIX</span>
            </h2>
            <p className="text-gray-500 text-md mt-2">
              dailyFIX – Local Household Service Finder.
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-3 text-primary">
              Connect With Us
            </h4>
            <div className="flex justify-center md:justify-end">
              <a
                href="#"
                className="w-9 h-9 rounded-lg hover:bg-primary flex items-center justify-center transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg hover:bg-primary flex items-center justify-center transition-colors"
                title="Twitter"
              >
                <X className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg hover:bg-primary flex items-center justify-center transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg hover:bg-primary flex items-center justify-center transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-primary font-semibold">dailyFIX</span>. All
            Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
