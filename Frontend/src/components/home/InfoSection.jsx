import { ArrowRight } from "lucide-react";

const InfoSection = ({ settings }) => {
    const title = settings?.infoTitle || "Crafted with\nIntention.";
    const text = settings?.infoText || "Every residence in our portfolio is handpicked for its architectural distinction, premium craftsmanship, and extraordinary sense of place. We don't just sell properties — we connect people with spaces that elevate how they live.";

    return (
        <section className="bg-black text-white py-32 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
                <div className="space-y-8">
                    <span className="text-sm font-medium tracking-widest text-white/50 uppercase">Our Philosophy</span>
                    <h2 className="text-4xl md:text-5xl font-light leading-snug whitespace-pre-line">
                        {title}
                    </h2>
                    <p className="text-white/60 text-lg font-light leading-relaxed max-w-md whitespace-pre-line">
                        {text}
                    </p>

                    <div className="pt-4">
                        <a href="/about" className="inline-flex items-center text-white border-b border-white/30 pb-1 hover:border-white transition-all group">
                            <span className="mr-3">Read Our Story</span>
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </div>

                <div className="relative h-[600px] w-full">
                    <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-gray-800 rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 ease-out">
                        <img
                            src={settings?.infoImage || "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"}
                            alt="Interior Design"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white/5 backdrop-blur-md border border-white/10 p-8 flex flex-col justify-between">
                        <span className="text-4xl font-serif italic text-white">15+</span>
                        <span className="text-xs uppercase tracking-widest text-white/60">Years of<br />Excellence</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
