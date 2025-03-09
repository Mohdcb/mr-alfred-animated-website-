import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="md:w-full pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Section */}
          <div>
            <h3 className="font-gilroy-b text-[25px] text-[#413D42] mb-6">Company</h3>
            <nav className="flex flex-col space-y-4">
              <Link href="/about" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">About</Link>
              <Link href="/content-hub" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Content Hub</Link>
              <Link href="/blog" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Blog</Link>
              <Link href="/independent-property-owners" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Independent Property Owners</Link>
              <Link href="/vacation-rental-management-companies" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Vacation Rental Management Companies</Link>
              <Link href="/contact-us" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Contact Us</Link>
              <Link href="/careers" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Careers</Link>
              <Link href="/login" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Login</Link>
            </nav>
          </div>

          {/* Features Section */}
          <div>
            <h3 className="font-gilroy-b text-[25px] text-[#413D42] mb-6">Features</h3>
            <nav className="flex flex-col space-y-4">
              <Link href="/multi-calender" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Multi-Calender</Link>
              <Link href="/finance-module" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Finance Module</Link>
              <Link href="/automated-guest-reviews" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Automated Guest Reviews</Link>
              <Link href="/security-deposits" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Security Deposits</Link>
              <Link href="/guest-identity-verification" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Guest Identity Verification</Link>
              <Link href="/cleaning-scheduler" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Cleaning Scheduler</Link>
            </nav>
          </div>

          {/* First part of Connect with Us */}
          <div>
            <div className="flex flex-col space-y-4 pt-16">
              <Link href="/direct-booking-engine" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Direct Booking Engine</Link>
              <Link href="/client-statements" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Client Statements</Link>
              <Link href="/host-app" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Host App</Link>
              <Link href="/channel-management" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Channel Management</Link>
              <Link href="/guest-messaging" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Guest Messaging</Link>
              <Link href="/reservation-manager" className="font-gilroy-r text-[20px] hover:text-gray-600 transition">Reservation Manager</Link>
            </div>
          </div>

          {/* Social Media Icons Column */}
          <div className="flex flex-col">
          <h3 className="font-gilroy-b text-[25px] mb-6 text-[#413D42]">Connect with Us</h3>

            <div className="flex space-x-4 mt-8">
              <Link href="https://facebook.com" aria-label="Facebook">
                <div className="w-10 h-10 bg-blue-800 text-white flex items-center justify-center rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </div>
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white flex items-center justify-center rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
              </Link>
              <Link href="https://linkedin.com" aria-label="LinkedIn">
                <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </div>
              </Link>
              <Link href="https://youtube.com" aria-label="YouTube">
                <div className="w-10 h-10 bg-red-600 text-white flex items-center justify-center rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Link href="/privacy-policy" className="font-gilroy-r text-[20px] text-gray-600 hover:text-gray-900">Privacy Policy</Link>
              <span className="text-gray-600">|</span>
              <Link href="/terms-conditions" className="font-gilroy-r text-[20px] text-gray-600 hover:text-gray-900">Terms & Conditions</Link>
            </div>
            <div>
              <p className="font-gilroy-r text-[20px] text-gray-600">@ 2024 mr. alfred LLC. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;