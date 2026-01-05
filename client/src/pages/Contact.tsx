'use client';
import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Contact: React.FC = () => {
  return (
    <section className="w-full h-auto bg-black text-white flex justify-center px-4" id="contact">
      <div className="w-full py-4 max-w-6xl">
        
        {/* Contact & Address Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
          
          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <h6 className="text-xl font-semibold mb-6">Contact</h6>
            <ul className="flex flex-col gap-4 m-0 p-0">
              <li className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition">
                <i className="fa-solid fa-phone text-lg w-5 text-center"></i>
                <span>0348002795</span>
              </li>
              <li className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition">
                <i className="fa-solid fa-envelope text-lg w-5 text-center"></i>
                <span>baotoanit1505@gmail.com</span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/hlbaot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-pink-400 transition"
                >
                  <i className="fa-brands fa-instagram text-lg w-5 text-center"></i>
                  <span>hlbaot</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Address */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
            <h6 className="text-xl font-semibold mb-6">Address</h6>
            <ul className="flex flex-col gap-4 m-0 p-0">
              <li className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition">
                <i className="fa-solid fa-location-dot text-lg w-5 text-center"></i>
                <span>Da Nang, Viet Nam</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
