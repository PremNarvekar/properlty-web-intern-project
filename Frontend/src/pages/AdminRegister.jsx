import { useState } from "react";
import { register_admin } from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const AdminRegister = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            if (!name || !email || !password) {
                setError("Please fill in all fields.");
                setLoading(false);
                return;
            }

            await register_admin({ name, email, password });
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black relative">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />

            <div className="absolute top-8 left-8 z-20">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors duration-300 group">
                    <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
                    Back to Home
                </Link>
            </div>

            <div className="relative z-10 w-full max-w-md p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">

                <div className="text-center space-y-2 mb-10">
                    <h1 className="text-3xl font-medium tracking-tight text-white">Join K Propertys</h1>
                    <p className="text-white/60 text-sm font-light">Create an account to manage listings.</p>
                </div>

                {error && <div className="text-red-400 text-center text-sm mb-6 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-white/50 focus:bg-black/40 transition-all outline-none placeholder-white/30 text-white text-sm"
                                placeholder="Full Name"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-white/50 focus:bg-black/40 transition-all outline-none placeholder-white/30 text-white text-sm"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 bg-black/20 border border-white/10 rounded-xl focus:border-white/50 focus:bg-black/40 transition-all outline-none placeholder-white/30 text-white text-sm"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black h-12 rounded-xl text-sm font-medium hover:bg-gray-200 transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Creating Account..." : "Sign Up"}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-8">
                    <p className="text-sm text-white/50 font-light">
                        Already have an account? <Link to="/admin" className="text-white font-medium hover:underline decoration-white/50 underline-offset-4">Sign in</Link>
                    </p>
                </div>

            </div>
        </div>
    );
};

export default AdminRegister;
