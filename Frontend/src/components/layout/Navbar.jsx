import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isHome = location.pathname === "/";
    const isAdmin = location.pathname.startsWith("/admin");

    if (isAdmin) return null;

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-0 py-4 ${scrolled ? "pt-4" : "pt-6"
                    }`}
            >
                <div
                    className={`max-w-[1400px] mx-auto flex justify-between items-center transition-all duration-500 ${scrolled
                        ? "bg-white/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-white/50 rounded-full px-8 py-3 mx-4 md:mx-auto max-w-[90%]"
                        : "px-6 md:px-12 bg-transparent"
                        }`}
                >
                    <Link to="/" className="z-50 group relative">
                        <span className={`font-medium text-lg tracking-tight transition-colors duration-300 ${!isHome || scrolled || isOpen ? 'text-gray-900' : 'text-white'}`}>
                            K Propertys
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-12">
                        {["Sales", "About", "Contact", "Admin"].map((item) => (
                            <Link
                                key={item}
                                to={`/${item.toLowerCase()}`}
                                className={`text-[13px] font-medium tracking-wide uppercase relative group transition-all duration-300 ${!isHome || scrolled ? 'text-gray-600 hover:text-black' : 'text-white/80 hover:text-white'
                                    }`}
                            >
                                {item}
                                <span className={`absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${!isHome || scrolled ? 'bg-black' : 'bg-white'}`}></span>
                            </Link>
                        ))}
                    </div>

                    <div className="md:hidden flex items-center z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 focus:outline-none ${isOpen ? 'bg-black text-white rotate-90' :
                                scrolled ? 'bg-gray-100 text-black hover:bg-gray-200' :
                                    'bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                                }`}
                        >
                            {isOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
                        </button>
                    </div>
                </div>
            </nav>

            <div
                className={`fixed inset-0 z-40 bg-white/60 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col justify-center items-center ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none delay-200'
                    }`}
            >
                <div className="flex flex-col items-center space-y-8">
                    {["Sales", "About Us", "Contact", "Admin"].map((item, index) => (
                        <Link
                            key={item}
                            to={`/${item.toLowerCase().replace(" ", "")}`}
                            onClick={() => setIsOpen(false)}
                            className={`text-4xl font-light tracking-tight text-gray-900 hover:text-gray-500 transition-all transform duration-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                }`}
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className={`absolute bottom-12 text-center transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Follow Us</p>
                    <div className="flex space-x-6 text-gray-900">
                        <span>Instagram</span>
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
