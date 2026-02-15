import { MapPin, Bed, Bath, Move } from "lucide-react";
import { Link } from "react-router-dom";

const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:3000${path}`;
};

const PropertyCard = ({ property }) => {
    return (
        <Link to={`/property/${property._id}`} className="block group cursor-pointer">
            <div className="relative overflow-hidden aspect-[4/5] rounded-[2rem] bg-gray-100 mb-6">
                <img
                    src={property.images && property.images[0] ? getImageUrl(property.images[0]) : "https://images.unsplash.com/photo-1600596542815-6ad4c727dd2c?auto=format&fit=crop&w=800&q=80"}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider text-gray-900 border border-white/20">
                    {property.type || "For Sale"}
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="space-y-3 px-2">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-medium text-gray-900 leading-snug group-hover:text-gray-600 transition-colors">
                        {property.title}
                    </h3>
                    <p className="text-lg font-light text-gray-900">
                        ${Number(property.price).toLocaleString()}
                    </p>
                </div>

                <p className="text-gray-500 font-light text-sm flex items-center">
                    <MapPin size={14} className="mr-1 text-gray-400" />
                    {property.location}
                </p>

                <div className="flex items-center space-x-6 text-sm text-gray-600 font-light pt-2 border-t border-gray-100 mt-4">
                    <div className="flex items-center space-x-2">
                        <Bed size={16} strokeWidth={1.5} />
                        <span>{property.bedrooms} Beds</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Bath size={16} strokeWidth={1.5} />
                        <span>{property.bathrooms} Baths</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Move size={16} strokeWidth={1.5} />
                        <span>{property.area} sqft</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
