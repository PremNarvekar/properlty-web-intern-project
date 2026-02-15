import { Search, ChevronDown, MapPin } from "lucide-react";

const SearchFilter = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="bg-white/60 backdrop-blur-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-3 md:p-4 mx-4 md:mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-2">


                    <div className="w-full md:w-[35%] px-6 py-4 md:py-3 relative group transition-all duration-300 hover:bg-white/50 rounded-2xl active:scale-[0.99] md:active:scale-100">
                        <label className="block text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-2 md:mb-1.5 group-focus-within:text-black transition-colors">
                            Location
                        </label>
                        <div className="flex items-center">
                            <MapPin size={16} className="text-gray-400 mr-3 md:mr-2.5 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="Where would you like to live?"
                                className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder-gray-400 outline-none truncate"
                            />
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-gray-200/50 mx-2"></div>
                    <div className="md:hidden w-full h-px bg-gray-200/50 my-1"></div>


                    <div className="w-full md:w-[20%] px-6 py-4 md:py-3 relative group transition-all duration-300 hover:bg-white/50 rounded-2xl cursor-pointer active:scale-[0.99] md:active:scale-100">
                        <label className="block text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-2 md:mb-1.5 group-hover:text-black transition-colors">
                            Type
                        </label>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">Any Type</span>
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors" />
                        </div>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-gray-200/50 mx-2"></div>
                    <div className="md:hidden w-full h-px bg-gray-200/50 my-1"></div>


                    <div className="w-full md:w-[25%] px-6 py-4 md:py-3 relative group transition-all duration-300 hover:bg-white/50 rounded-2xl cursor-pointer active:scale-[0.99] md:active:scale-100">
                        <label className="block text-[10px] md:text-[11px] uppercase tracking-widest font-bold text-gray-400 mb-2 md:mb-1.5 group-hover:text-black transition-colors">
                            Price Range
                        </label>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-gray-900">All Prices</span>
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-black transition-colors" />
                        </div>
                    </div>


                    <div className="w-full md:w-[20%] p-1.5 mt-2 md:mt-0">
                        <button className="w-full bg-gray-900 hover:bg-black text-white h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-900/20 cursor-pointer transform active:scale-[0.98] group">
                            <Search size={18} className="mr-2.5 transition-transform group-hover:scale-110" />
                            <span className="font-semibold text-sm tracking-wide">Search</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
