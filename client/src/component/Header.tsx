'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import '../styles/Head.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import ButtonLogin from './btn_login';
import Cookies from "js-cookie";

export default function Head() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    const handleLogout = () => {
        Cookies.remove("email");
        Cookies.remove("token");
        window.location.reload();
    }

    useEffect(() => {
        (async () => {
            const AOS = (await import('aos')).default;
            AOS.init({ duration: 1000 });
        })();
    }, []);
    // effect head scroll
    useEffect(() => {
        const update = () => {
            const y = window.scrollY;
            setIsVisible(y <= lastScrollY.current);
            lastScrollY.current = y;
            ticking.current = false;
        };

        const onScroll = () => {
            if (!ticking.current) {
                ticking.current = true;
                requestAnimationFrame(update);
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Scroll đến section
    const scrollToId = useCallback((id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMenuOpen(false);
    }, []);

    const email = Cookies.get("email");

    return (
        <motion.header
            className="head w-full h-auto fixed top-0 left-0 right-0 bg-opacity-50 flex justify-around items-center"
            data-aos="fade-down"
            initial={{ y: 0 }}
            animate={{ y: isVisible ? 0 : '-100%' }}
            transition={{ duration: 0.15 }}
        >
            {/* Logo */}
            <div className="lg:block hidden">
                <span
                    className="logo text-white text-4xl cursor-pointer"
                    onClick={() => scrollToId('home')}
                >
                    Booking Photo
                </span>
            </div>

            {/* Navigation */}
            <nav className="nav_bar" aria-label="Main">
                <button
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                    onClick={() => setIsMenuOpen(v => !v)}
                    className="md:hidden"
                    type="button"
                >
                    <FontAwesomeIcon icon={faBars} className="text-2xl text-white" />
                </button>

                <ul className={`nav_list ${isMenuOpen ? 'mobile-open' : ''}`}>
                    <li><button onClick={() => scrollToId('home')} className="px-3 py-2 hover:text-rose-400">Home</button></li>
                    <li><button onClick={() => scrollToId('explore')} className="px-3 py-2 hover:text-rose-400">Explore</button></li>
                    <li><button onClick={() => scrollToId('service')} className="px-3 py-2 hover:text-rose-400">Service</button></li>
                    <li><button onClick={() => scrollToId('review')} className="px-3 py-2 hover:text-rose-400">Your Reviews</button></li>
                    <li><button onClick={() => scrollToId('contact')} className="px-3 py-2 hover:text-rose-400">Contact</button></li>
                </ul>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-[1rem]">
                {email ? (
                    <div className="flex items-center gap-2 text-white">
                        <span>Hi, {email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm text-red-400 hover:underline"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <ButtonLogin/>
                )}

                <button
                    onClick={() => scrollToId('service')}
                    className="btn"
                    type="button"
                >
                    Book Now !
                </button>
            </div>
        </motion.header>
    );
}
