import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Bell, User, MessageCircle, Phone, Mail, Instagram } from 'lucide-react';

const Navbar = () => {
    const { user } = useAuth();
    const [showContact, setShowContact] = useState(false);
    const contactRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (contactRef.current && !contactRef.current.contains(event.target)) {
                setShowContact(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-orange-400  dark:bg-dark-surface border-b border-slate-200 dark:border-dark-border h-16 flex items-center justify-between px-6 transition-colors duration-200">
            <div className="flex-1">
                {/* Placeholder for search or breadcrumbs */}
            </div>

            <div className="flex items-center gap-4">
                {/* Contact Panel Dropdown */}
                <div className="relative" ref={contactRef}>
                    <button
                        className="p-2 text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors flex items-center gap-2"
                        onClick={() => setShowContact(!showContact)}
                        aria-label="Contact Us"
                    >
                        <MessageCircle className="w-5 h-5" />
                        <span className="hidden sm:inline text-sm font-medium">Contact Us</span>
                    </button>

                    {/* Dropdown Menu */}
                    <div
                        className={`absolute right-0 mt-2 w-64 bg-orange-300 dark:bg-dark-surface rounded-xl shadow-xl border border-slate-200 dark:border-dark-border overflow-hidden z-50 transition-all duration-200 origin-top-right ${showContact ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                            }`}
                    >
                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50">
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Contact Support</h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">We're here to help you 24/7</p>
                        </div>
                        <div className="p-2 flex flex-col gap-1">
                            <a href="tel:+1234567890" className="flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-lg transition-colors group">
                                <div className="w-9 h-9 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-slate-700 dark:text-slate-300">Phone</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">91-7814607949</p>
                                </div>
                            </a>

                            <a href="mailto:support@example.com" className="flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-lg transition-colors group">
                                <div className="w-9 h-9 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-slate-700 dark:text-slate-300">Email</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">aash447700@example.com</p>
                                </div>
                            </a>

                            <a href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-lg transition-colors group">
                                <div className="w-9 h-9 rounded-full bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform">
                                    <Instagram className="w-4 h-4" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-medium text-slate-700 dark:text-slate-300">Instagram</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400"><a href="https://www.instagram.com/aa.shish_40/">INSTAGRAM</a></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <button className="relative p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center gap-3 border-l border-slate-200 dark:border-dark-border pl-4">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold border border-primary-200 dark:border-primary-800/50">
                        {user?.name?.charAt(0) || <User className="w-4 h-4" />}
                    </div>
                    <div className="hidden md:block text-sm">
                        <p className="font-medium text-slate-800 dark:text-slate-200">{user?.name || 'Guest User'}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-xs truncate">{user?.email}</p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
