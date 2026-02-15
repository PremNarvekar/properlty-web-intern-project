import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProperty, getProperties, deleteProperty, getSettings, updateSettings } from "../services/api";
import { LayoutDashboard, Settings, LogOut, Plus, Trash2, Image as ImageIcon, MapPin, Home, Menu, X } from "lucide-react";

const getImageUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `http://localhost:3000${path}`;
};

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("properties");
    const [properties, setProperties] = useState([]);
    const [settings, setSiteSettings] = useState({
        heroImage: "",
        heroTitle: "",
        heroSubtitle: "",
        infoTitle: "",
        infoText: "",
        infoImage: "",
        luxuryTitle: "",
        luxuryDescription: "",
        luxuryImage: "",
        contactEmail: "",
        phoneNumber: "",
        aboutText: ""
    });
    const [heroImageFile, setHeroImageFile] = useState(null);


    const [formData, setFormData] = useState({
        title: "", description: "", price: "", location: "",
        bedrooms: "", bathrooms: "", area: "", type: "For Sale"
    });
    const [image, setImage] = useState(null);
    const [propertyImageUrl, setPropertyImageUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [settingsLoading, setSettingsLoading] = useState(false);

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProperties();
        fetchSettings();
    }, []);

    const fetchProperties = async () => {
        try {
            const data = await getProperties();
            setProperties(data);
        } catch (err) {
            console.error("Failed to load properties", err);
        }
    };

    const fetchSettings = async () => {
        try {
            const data = await getSettings();
            setSiteSettings({
                heroImage: data.heroImage || "",
                heroTitle: data.heroTitle || "",
                heroSubtitle: data.heroSubtitle || "",
                infoTitle: data.infoTitle || "",
                infoText: data.infoText || "",
                infoImage: data.infoImage || "",
                luxuryTitle: data.luxuryTitle || "",
                luxuryDescription: data.luxuryDescription || "",
                luxuryImage: data.luxuryImage || "",
                contactEmail: data.contactEmail || "",
                phoneNumber: data.phoneNumber || "",
                aboutText: data.aboutText || ""
            });
        } catch (err) {
            console.error("Failed to load settings", err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin");
    };

    const handlePropertySubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = new FormData();
            Object.keys(formData).forEach(key => data.append(key, formData[key]));
            if (image) data.append("images", image);
            if (propertyImageUrl) data.append("imageUrls", propertyImageUrl);

            await createProperty(data);

            setFormData({
                title: "", description: "", price: "", location: "",
                bedrooms: "", bathrooms: "", area: "", type: "For Sale"
            });
            setImage(null);
            setPropertyImageUrl("");

            await fetchProperties();
            alert("Property added successfully");
        } catch (err) {
            alert(err.response?.data?.message || "Error adding property");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            try {
                await deleteProperty(id);
                fetchProperties();
            } catch (err) {
                alert("Failed to delete property");
            }
        }
    };

    const handleSettingsSubmit = async (e) => {
        e.preventDefault();
        setSettingsLoading(true);
        try {
            const data = new FormData();
            if (heroImageFile) {
                data.append("heroImage", heroImageFile);
            } else if (settings.heroImage) {
                data.append("heroImage", settings.heroImage);
            }
            data.append("heroTitle", settings.heroTitle);
            data.append("heroSubtitle", settings.heroSubtitle);
            data.append("infoTitle", settings.infoTitle);
            data.append("infoText", settings.infoText);
            data.append("infoImage", settings.infoImage);
            data.append("luxuryTitle", settings.luxuryTitle);
            data.append("luxuryDescription", settings.luxuryDescription);
            data.append("luxuryImage", settings.luxuryImage);
            data.append("contactEmail", settings.contactEmail);
            data.append("phoneNumber", settings.phoneNumber);
            data.append("aboutText", settings.aboutText);

            await updateSettings(data);
            await fetchSettings();
            alert("Site settings updated successfully.");
        } catch (err) {
            console.error(err);
            alert("Failed to update settings");
        } finally {
            setSettingsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white font-sans flex relative overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 fixed pointer-events-none"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm fixed pointer-events-none" />


            <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/10 p-4 flex justify-between items-center">
                <span className="font-medium">K Admin</span>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white">
                    {sidebarOpen ? <X /> : <Menu />}
                </button>
            </div>


            <aside
                className={`w-64 border-r border-white/10 bg-black/80 backdrop-blur-xl z-20 flex flex-col fixed h-full transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-8 border-b border-white/5 mt-16 lg:mt-0">
                    <h1 className="text-xl font-medium tracking-tight">K Admin</h1>
                    <p className="text-xs text-gray-400 mt-1">Portfolio Manager</p>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <button
                        onClick={() => { setActiveTab("properties"); setSidebarOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "properties" ? "bg-white text-black font-medium" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <LayoutDashboard size={18} />
                        <span>Properties</span>
                    </button>
                    <button
                        onClick={() => { setActiveTab("settings"); setSidebarOpen(false); }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "settings" ? "bg-white text-black font-medium" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}
                    >
                        <Settings size={18} />
                        <span>Site Settings</span>
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                    >
                        <Home size={18} />
                        <span>View Live Site</span>
                    </button>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut size={18} />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>


            <main className="flex-1 lg:ml-64 p-4 lg:p-8 relative z-10 h-screen overflow-y-auto pt-24 lg:pt-8 w-full">
                <div className="max-w-6xl mx-auto pb-20">
                    <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-medium">{activeTab === "properties" ? "Property Listings" : "Site Configuration"}</h2>
                            <p className="text-gray-400 mt-1">Manage your luxury real estate portfolio.</p>
                        </div>
                    </header>

                    {activeTab === "properties" ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sticky top-8">
                                    <h3 className="text-lg font-medium mb-6 flex items-center">
                                        <Plus size={18} className="mr-2" /> Add New Property
                                    </h3>
                                    <form onSubmit={handlePropertySubmit} className="space-y-4">
                                        <input type="text" placeholder="Property Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors" required />
                                        <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors h-24 resize-none" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="text" placeholder="Price ($)" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors" required />
                                            <input type="text" placeholder="Area (sq ft)" value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors" required />
                                        </div>
                                        <input type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors" required />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="number" placeholder="Beds" value={formData.bedrooms} onChange={e => setFormData({ ...formData, bedrooms: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors" required />
                                            <input type="number" placeholder="Baths" value={formData.bathrooms} onChange={e => setFormData({ ...formData, bathrooms: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors" required />
                                        </div>

                                        <div className="relative">
                                            <input type="file" onChange={e => setImage(e.target.files[0])} className="hidden" id="file-upload" />
                                            <label htmlFor="file-upload" className="w-full flex items-center justify-center space-x-2 bg-black/20 border border-dashed border-white/30 rounded-lg py-8 cursor-pointer hover:bg-white/5 transition-colors">
                                                <ImageIcon size={20} className="text-gray-400" />
                                                <span className="text-sm text-gray-400 truncate px-2">{image ? image.name : "Upload Image"}</span>
                                            </label>
                                        </div>
                                        <div className="mt-4">
                                            <input
                                                type="text"
                                                placeholder="Or Image URL (e.g. https://...)"
                                                value={propertyImageUrl}
                                                onChange={e => setPropertyImageUrl(e.target.value)}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                            />
                                        </div>

                                        <button type="submit" disabled={loading} className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors">
                                            {loading ? "Adding..." : "Publish Property"}
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="lg:col-span-2 space-y-4">
                                {properties.map(property => (
                                    <div key={property._id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center space-x-4 group hover:bg-white/10 transition-colors">
                                        <div className="w-24 h-24 bg-gray-700 rounded-xl overflow-hidden shrink-0 relative">
                                            {property.images && property.images[0] ? (
                                                <img src={getImageUrl(property.images[0])} alt={property.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-500"><ImageIcon /></div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-lg truncate">{property.title}</h4>
                                            <p className="text-gray-400 text-sm flex items-center mt-1"><MapPin size={14} className="mr-1" /> {property.location}</p>
                                            <p className="text-white/80 font-light mt-2">${Number(property.price).toLocaleString()}</p>
                                        </div>
                                        <button onClick={() => handleDelete(property._id)} className="p-3 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-100 lg:opacity-0 group-hover:opacity-100">
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                ))}
                                {properties.length === 0 && (
                                    <div className="text-center py-20 text-gray-500 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                        No properties found. Add your first listing.
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-2xl">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8">
                                <h3 className="text-xl font-medium mb-6">General Configuration</h3>
                                <form onSubmit={handleSettingsSubmit} className="space-y-8">

                                    <div className="space-y-4 border-b border-white/5 pb-8">
                                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Hero Section</h4>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Hero Background Image</label>

                                            {settings.heroImage && !heroImageFile && (
                                                <div className="mb-4 w-full h-48 rounded-lg overflow-hidden bg-gray-800">
                                                    <img src={getImageUrl(settings.heroImage)} alt="Current Hero" className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="relative">
                                                <input type="file" onChange={e => setHeroImageFile(e.target.files[0])} className="hidden" id="hero-upload" />
                                                <label htmlFor="hero-upload" className="w-full flex items-center justify-center space-x-2 bg-black/20 border border-dashed border-white/30 rounded-lg py-8 cursor-pointer hover:bg-white/5 transition-colors">
                                                    <ImageIcon size={20} className="text-gray-400" />
                                                    <span className="text-sm text-gray-400">{heroImageFile ? heroImageFile.name : "Upload New Hero Image"}</span>
                                                </label>
                                            </div>
                                            <div className="mt-4">
                                                <label className="block text-sm text-gray-400 mb-2">Or Image URL</label>
                                                <input
                                                    type="text"
                                                    value={settings.heroImage || ""}
                                                    onChange={e => setSiteSettings({ ...settings, heroImage: e.target.value })}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
                                                <input
                                                    type="text"
                                                    value={settings.heroTitle || ""}
                                                    onChange={e => setSiteSettings({ ...settings, heroTitle: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
                                                <input
                                                    type="text"
                                                    value={settings.heroSubtitle || ""}
                                                    onChange={e => setSiteSettings({ ...settings, heroSubtitle: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 border-b border-white/5 pb-8">
                                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Info Section (Why Choose Us)</h4>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                            <input
                                                type="text"
                                                value={settings.infoTitle || ""}
                                                onChange={e => setSiteSettings({ ...settings, infoTitle: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Section Text</label>
                                            <textarea
                                                value={settings.infoText || ""}
                                                onChange={e => setSiteSettings({ ...settings, infoText: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors h-24 resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Section Image URL</label>
                                            <div className="flex gap-4 items-start">
                                                <input
                                                    type="text"
                                                    value={settings.infoImage || ""}
                                                    onChange={e => setSiteSettings({ ...settings, infoImage: e.target.value })}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                                />
                                                {settings.infoImage && (
                                                    <div className="w-16 h-16 rounded overflow-hidden bg-gray-800 shrink-0 border border-white/10">
                                                        <img src={settings.infoImage} alt="Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 border-b border-white/5 pb-8">
                                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Luxury Section</h4>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                            <input
                                                type="text"
                                                value={settings.luxuryTitle || ""}
                                                onChange={e => setSiteSettings({ ...settings, luxuryTitle: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Section Description</label>
                                            <textarea
                                                value={settings.luxuryDescription || ""}
                                                onChange={e => setSiteSettings({ ...settings, luxuryDescription: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors h-24 resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Section Image URL</label>
                                            <div className="flex gap-4 items-start">
                                                <input
                                                    type="text"
                                                    value={settings.luxuryImage || ""}
                                                    onChange={e => setSiteSettings({ ...settings, luxuryImage: e.target.value })}
                                                    placeholder="https://example.com/image.jpg"
                                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                                />
                                                {settings.luxuryImage && (
                                                    <div className="w-16 h-16 rounded overflow-hidden bg-gray-800 shrink-0 border border-white/10">
                                                        <img src={settings.luxuryImage} alt="Preview" className="w-full h-full object-cover" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Information</h4>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Contact Email</label>
                                                <input
                                                    type="email"
                                                    value={settings.contactEmail || ""}
                                                    onChange={e => setSiteSettings({ ...settings, contactEmail: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                                                <input
                                                    type="text"
                                                    value={settings.phoneNumber || ""}
                                                    onChange={e => setSiteSettings({ ...settings, phoneNumber: e.target.value })}
                                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-sm text-gray-400 mb-2">About Footer Text</label>
                                            <textarea
                                                value={settings.aboutText || ""}
                                                onChange={e => setSiteSettings({ ...settings, aboutText: e.target.value })}
                                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-white/40 outline-none transition-colors h-24 resize-none"
                                            />
                                        </div>
                                    </div>

                                    <button type="submit" disabled={settingsLoading} className="w-full px-8 py-4 bg-white text-black font-bold tracking-wide rounded-xl hover:bg-gray-200 transition-colors shadow-lg">
                                        {settingsLoading ? "Saving Changes..." : "Save Configuration"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
