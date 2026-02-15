import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProperty } from "../services/api";
import { ArrowLeft, MapPin, Bed, Bath, Move, Share2, Heart } from "lucide-react";
import Footer from "../components/layout/Footer";

const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return path;
};

const PropertyDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const data = await getProperty(id);
                setProperty(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-10 h-10 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-sm font-light tracking-wide">Loading property...</p>
                </div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-light text-gray-900">Property Not Found</h2>
                    <p className="text-gray-400 font-light">This listing may have been removed or is no longer available.</p>
                    <Link to="/" className="inline-block mt-4 text-sm font-medium border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                        Return Home
                    </Link>
                </div>
            </div>
        );
    }

    const images = property.images && property.images.length > 0
        ? property.images
        : ["https://images.unsplash.com/photo-1600596542815-6ad4c727dd2c?auto=format&fit=crop&w=800&q=80"];

    return (
        <div className="bg-white min-h-screen">
            <div className="pt-24 pb-8 px-4 md:px-8 max-w-[1400px] mx-auto">
                <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black transition-colors group mb-8">
                    <ArrowLeft size={16} className="mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to listings
                </Link>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-gray-100 mb-6">
                    <img
                        src={getImageUrl(images[activeImage])}
                        alt={property.title}
                        className="w-full h-full object-cover transition-all duration-700"
                    />

                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-2.5 rounded-full text-xs font-medium uppercase tracking-wider text-gray-900">
                        {property.type || "For Sale"}
                    </div>

                    <div className="absolute top-6 right-6 flex space-x-3">
                        <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                            <Share2 size={16} className="text-gray-700" />
                        </button>
                        <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                            <Heart size={16} className="text-gray-700" />
                        </button>
                    </div>
                </div>

                {images.length > 1 && (
                    <div className="flex gap-3 mb-12 overflow-x-auto pb-2">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                className={`flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeImage === index ? 'border-black' : 'border-transparent opacity-60 hover:opacity-100'}`}
                            >
                                <img src={getImageUrl(img)} alt="" className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="space-y-4">
                            <h1 className="text-3xl md:text-5xl font-light text-gray-900 leading-tight">
                                {property.title}
                            </h1>
                            <div className="flex items-center text-gray-500 font-light">
                                <MapPin size={16} className="mr-2 text-gray-400" />
                                {property.location}
                            </div>
                        </div>

                        <div className="flex items-center space-x-8 py-6 border-y border-gray-100">
                            <div className="flex items-center space-x-3">
                                <Bed size={20} strokeWidth={1.5} className="text-gray-400" />
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{property.bedrooms}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Bedrooms</p>
                                </div>
                            </div>
                            <div className="w-px h-10 bg-gray-100"></div>
                            <div className="flex items-center space-x-3">
                                <Bath size={20} strokeWidth={1.5} className="text-gray-400" />
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{property.bathrooms}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Bathrooms</p>
                                </div>
                            </div>
                            <div className="w-px h-10 bg-gray-100"></div>
                            <div className="flex items-center space-x-3">
                                <Move size={20} strokeWidth={1.5} className="text-gray-400" />
                                <div>
                                    <p className="text-lg font-medium text-gray-900">{property.area}</p>
                                    <p className="text-xs text-gray-400 uppercase tracking-wide">Sq. Ft.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase tracking-widest text-gray-400">About This Property</h3>
                            <p className="text-gray-600 font-light leading-relaxed text-lg">
                                {property.description}
                            </p>
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-gray-50 rounded-2xl p-8 space-y-6">
                            <div>
                                <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Asking Price</p>
                                <p className="text-4xl font-light text-gray-900">
                                    ${Number(property.price).toLocaleString()}
                                </p>
                            </div>

                            <div className="space-y-3 pt-4">
                                <button className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-xl text-sm font-medium transition-all duration-300 hover:shadow-lg">
                                    Schedule a Viewing
                                </button>
                                <button className="w-full bg-white border border-gray-200 hover:border-gray-400 text-gray-900 py-4 rounded-xl text-sm font-medium transition-all duration-300">
                                    Request Details
                                </button>
                            </div>

                            <div className="pt-4 border-t border-gray-200 space-y-3">
                                <p className="text-xs text-gray-400 uppercase tracking-widest">Contact Agent</p>
                                <p className="text-sm text-gray-700 font-light">sean@kpropertys.com</p>
                                <p className="text-sm text-gray-700 font-light">+1 246 232 4444</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PropertyDetail;
