import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { getSettings } from "../../services/api";

const Hero = ({ settings }) => {
    const defaultImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop";
    const title = settings?.heroTitle || "Discover Refined\nLiving.";
    const subtitle = settings?.heroSubtitle || "Where visionary design meets timeless elegance — curated residences for the discerning few.";

    let heroImage = defaultImage;
    if (settings?.heroImage) {
        heroImage = settings.heroImage.startsWith("http") ? settings.heroImage : `http://localhost:3000${settings.heroImage}`;
    }

    return (
        <div className="relative h-screen w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-100 opacity-100"
                style={{ backgroundImage: `url('${heroImage}')` }}
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl space-y-8 animate-fade-in-up">
                    <h2 className="text-white/80 text-sm md:text-base font-medium tracking-[0.3em] uppercase mb-4">
                        Curated Living
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl text-white font-light tracking-tight leading-tight whitespace-pre-line">
                        {title}
                    </h1>
                    <p className="text-white/70 text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="pt-10">
                        <Link
                            to="/sales"
                            className="group inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md border border-white/30 rounded-full px-8 py-4 text-white hover:bg-white hover:text-black transition-all duration-300"
                        >
                            <span className="text-sm font-medium tracking-wide uppercase">Explore Collection</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50">
                <div className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white to-transparent"></div>
            </div>
        </div>
    );
};

export default Hero;
