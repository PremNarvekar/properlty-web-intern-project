import { ArrowRight } from "lucide-react";

const Newsletter = () => {
    return (
        <section className="bg-gray-50 py-32 border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-6 text-center text-gray-900">
                <span className="text-xs font-medium tracking-widest uppercase mb-4 block">Stay Connected</span>
                <h2 className="text-3xl md:text-5xl font-light mb-6">
                    Be the first to know.
                </h2>
                <p className="text-gray-500 font-light text-lg mb-12 max-w-lg mx-auto">
                    Gain early access to off-market listings, market insights, and exclusive invitations to private viewings.
                </p>

                <form className="max-w-md mx-auto relative group">
                    <input
                        type="email"
                        placeholder="Your email address"
                        className="w-full bg-transparent border-b border-gray-300 py-4 px-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-black transition-colors text-lg"
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-4 text-gray-400 hover:text-black transition-colors"
                    >
                        <ArrowRight size={20} />
                    </button>

                    <p className="mt-4 text-xs text-gray-400 font-light">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
