import React from "react";
import { Mail, Facebook, Twitter, Github, Linkedin } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-white shadow-inner rounded-t-xl text-black pt-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center pb-2 gap-6">
          <div className="sm:col-span-2 lg:col-span-1 text-center md:text-left">
            <h2 className="text-4xl font-bold text-center">
                daily<span className="text-primary">FIX</span>
            </h2>
            <p className="text-black text-md mb-6">
              dailyFIX – Local Household Service Finder.
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold text-lg mb-2">Connect With Us</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-black hover:text-white transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-black hover:text-white transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-black hover:text-white transition-colors duration-300"
              >
                <Github size={24} />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-black hover:text-white transition-colors duration-300"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-black py-8 text-center text-sm text-black">
          <p>&copy; {new Date().getFullYear()} HERO.IO. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
