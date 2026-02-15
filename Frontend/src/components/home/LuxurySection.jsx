import { useEffect, useState } from "react";
import { getProperties } from "../../services/api";
import PropertyCard from "../shared/PropertyCard";

const LuxurySection = ({ settings }) => {
    const [properties, setProperties] = useState([]);
    const title = settings?.luxuryTitle || "Residences Beyond\nthe Ordinary.";
    const description = settings?.luxuryDescription || "Featured Collection";

    useEffect(() => {
        const fetchProps = async () => {
            try {
                const data = await getProperties();
                setProperties(data.slice(0, 3));
            } catch (err) {
                console.error(err);
            }
        };
        fetchProps();
    }, []);

    return (
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 relative py-20">
            {settings?.luxuryImage && (
                <div
                    className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `url('${settings.luxuryImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                />
            )}

            <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-6 md:space-y-0 relative z-10">
                <div className="max-w-xl">
                    <span className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-3 block">{description}</span>
                    <h2 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight whitespace-pre-line">
                        {title}
                    </h2>
                </div>
                <div className="hidden md:block">
                    <a href="/sales" className="text-sm font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                        View All Properties
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {properties.map((property, index) => (
                    <div key={property._id} className="transition-all duration-700 delay-[100ms]" style={{ transitionDelay: `${index * 150}ms` }}>
                        <PropertyCard property={property} />
                    </div>
                ))}

                {properties.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-gray-50 rounded-2xl">
                        <p className="text-gray-400 font-light italic">Refining our collection. New properties arriving soon.</p>
                    </div>
                )}
            </div>

            <div className="md:hidden mt-12 text-center">
                <a href="/sales" className="inline-block text-sm font-medium border-b border-black pb-1">
                    View All Properties
                </a>
            </div>
        </section>
    );
};

export default LuxurySection;
