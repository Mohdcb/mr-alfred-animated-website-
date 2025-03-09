import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const fadeIn = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const staggerChildren = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const slideLeft = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const slideRight = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6 }
        }
    };

    const navItems = ["Home", "About", "Features", "Solution", "Pricing", "Contact"];

    return (
        <motion.header
            className="flex flex-row align-middle items-center justify-between px-4 md:px-8 lg:px-20 pt-5 pb-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
        >
            <motion.div variants={slideRight}>
                <img src="images/logo.png" alt="Logo" width={180} height={54} className="object-contain  " />
            </motion.div>

            {/* Desktop Navigation */}
            <motion.nav
                className="hidden lg:flex space-x-8"
                variants={staggerChildren}
            >
                {navItems.map((item) => (
                    <motion.div key={item} variants={fadeIn}>
                        <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="text-lg font-medium hover:text-teal-600 transition">
                            {item}
                        </Link>
                    </motion.div>
                ))}
            </motion.nav>

            {/* Desktop CTA Buttons */}
            <motion.div variants={slideLeft} 
                className="hidden md:flex">
                <div className="flex py-5 gap-[25px]">
                    <motion.div 
                    whileHover={{ scale: 1.05, backgroundColor: "white", color: "#008080", border: "1px 1px #008080" }}

                        transition={{ duration: 0.2 }} 
                        className="bg-[#008080] text-white px-5 md:px-7 py-2 md:py-3 rounded-[45px] text-[16px] md:text-[18px]">
                        <button>Start Free Trial</button>
                    </motion.div>

                    <motion.div 
                    whileHover={{ scale: 1.05, backgroundColor: "#008080", color: "white" , rotate:"-1deg" }}

                        transition={{ duration: 0.2 }} 
                        className="border-[#008080] border-[1px] text-[#008080] px-5 md:px-7 text-[16px] md:text-[18px] py-2 md:py-3 rounded-[45px]">
                        <button>Chat with us</button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Mobile Hamburger Menu Button */}
            <div className="lg:hidden flex items-center">
                <button
                    onClick={toggleMenu}
                    className="p-2 text-gray-600 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-50 p-5">
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-lg font-medium hover:text-teal-600 transition"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="flex flex-col py-5 gap-4">
                            <div className="bg-[#008080] text-white px-5 py-2 rounded-[45px] text-[16px] text-center">
                                <button>Start Free Trial</button>
                            </div>
                            <div className="border-[#008080] border-[1px] text-[#008080] px-5 text-[16px] py-2 rounded-[45px] text-center">
                                <button>Chat with us</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </motion.header>
    );
};

export default Header;