import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-stone-900 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-12">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-b border-gray-700 pb-12">
                    <div>
                        <h3 className="text-5xl font-serif mb-2">25</h3>
                        <p className="text-gray-400 font-light text-sm max-w-[200px] mx-auto">years of experience in selling and renting luxury residential property.</p>
                    </div>
                    <div>
                        <h3 className="text-5xl font-serif mb-2">3</h3>
                        <p className="text-gray-400 font-light text-sm">countries of practice in Real Estate.</p>
                    </div>
                    <div>
                        <h3 className="text-5xl font-serif mb-2">1</h3>
                        <p className="text-gray-400 font-light text-sm max-w-[200px] mx-auto">goal to ensure a transparent, seamless and pleasant transaction for all parties concerned.</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col items-center justify-center mb-6">
                        <span className="font-bold text-2xl uppercase tracking-widest">K Propertys</span>
                        <span className="text-xs tracking-[0.3em] font-light uppercase text-gray-400">Real Estate</span>
                    </div>

                    <p className="underline decoration-1 underline-offset-4 text-gray-300 hover:text-white transition">
                        sean@kpropertys.com
                    </p>
                    <p className="text-gray-300 font-light tracking-wide">
                        +1 246 232 4444
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm font-light text-gray-400">
                    <Link to="/" className="hover:text-white transition">Home</Link>
                    <Link to="/properties" className="hover:text-white transition">Search properties</Link>
                    <Link to="/about" className="hover:text-white transition">About us</Link>
                </div>
                <div className="flex flex-wrap justify-center gap-6 text-sm font-light text-gray-400 mt-2">
                    <Link to="/contact" className="hover:text-white transition">Contact</Link>
                    <Link to="/policy" className="hover:text-white transition">Policy</Link>
                    <Link to="/cookies" className="hover:text-white transition">Cookies</Link>
                </div>

                <div className="flex justify-center gap-4 pt-4">
                    <a href="#" className="p-2 border border-gray-600 rounded-full hover:border-white hover:text-white text-gray-400 transition">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="p-2 border border-gray-600 rounded-full hover:border-white hover:text-white text-gray-400 transition">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="p-2 border border-gray-600 rounded-full hover:border-white hover:text-white text-gray-400 transition">
                        <Linkedin size={18} />
                    </a>
                </div>

                <div className="text-xs text-gray-500 pt-8">
                    ©2024 K Propertys. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
