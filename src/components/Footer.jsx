import React from 'react';
import { Mail, Facebook, Twitter, Github, Linkedin } from 'lucide-react';
const Footer = () => {
  return (
    <footer className="bg-white shadow-inner rounded-t-xl text-black pt-8 mt-10">
      <div className="container mx-auto px-6">

        <div className="flex flex-col md:flex-row justify-between items-center pb-2 gap-6">
          <div className="sm:col-span-2 lg:col-span-1 text-center md:text-left">
            <div className='flex justify-center md:justify-start gap-x-2 items-center mb-4'>
              <a className="btn btn-ghost text-xl">dailyFIX</a>
            </div>
            <p className="text-black mb-6 max-w-xs mx-auto md:mx-0">
              The ultimate destination for discovering the best toys for your kids.
            </p>
          </div>

          <div className="text-center md:text-right">
            <h4 className="font-bold text-md mb-2">Connect With Us</h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-black hover:text-white transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-black hover:text-white transition-colors duration-300">
                <Twitter size={24} />
              </a>
              <a target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-black hover:text-white transition-colors duration-300">
                <Github size={24} />
              </a>
              <a target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-black hover:text-white transition-colors duration-300">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-black py-4 text-center text-sm text-black">
          <p>&copy; {new Date().getFullYear()} HERO.IO. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;