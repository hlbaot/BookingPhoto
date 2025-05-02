import React from "react";
import "../assets/styles/Contact.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Contact: React.FC = () => {
    return (
        <section className="w-full h-auto bg-black text-white py-8 flex justify-center">
            <div className="contact flex flex-col md:flex-row justify-center gap-[2rem] items-center w-[80%]">
                {/* Contact Info */}
                <div className="w-1/2 flex flex-col text-center md:items-start md:text-left">
                    <h6 className="text-lg font-semibold mb-4">Contact</h6>
                    <ul className="flex flex-col gap-3">
                        <li className="flex items-center gap-3">
                            <i className="fa-solid fa-phone"></i>
                            <span>0348002795</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <i className="fa-solid fa-envelope"></i>
                            <span>baotoanit1505@gmail.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <a
                                href="https://www.instagram.com/hlbaot/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white "
                            >
                                <i className="fa-brands fa-instagram"></i>
                                <span>hlbaot</span>
                            </a>
                        </li>

                    </ul>
                </div>

                {/* Address */}
                <div className="w-1/2 flex  text-center md:items-start md:text-left">
                    <h6 className="text-lg font-semibold mb-4">Address</h6>
                    <ul>
                        <li className="flex items-center gap-3">
                            <a href="#" className="flex items-center gap-3">
                                <i className="fa-solid fa-location-dot"></i>
                                <span>Da Nang, Viet Nam</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Contact;
