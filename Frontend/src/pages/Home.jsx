import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import SearchFilter from "../components/home/SearchFilter";
import LuxurySection from "../components/home/LuxurySection";
import InfoSection from "../components/home/InfoSection";
import Newsletter from "../components/home/Newsletter";
import { getSettings } from "../services/api";

const Home = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await getSettings();
                setSettings(data);
            } catch (error) {
                console.error("Failed to load site settings");
            }
        };
        fetchSettings();
    }, []);

    return (
        <div className="bg-white min-h-screen">
            <Hero settings={settings} />


            <div className="relative z-20 -mt-20 px-4 mb-20">
                <SearchFilter />
            </div>

            <div className="space-y-32 pb-32">
                <InfoSection settings={settings} />

                <LuxurySection settings={settings} />

                <Newsletter />
            </div>
        </div>
    );
};

export default Home;
