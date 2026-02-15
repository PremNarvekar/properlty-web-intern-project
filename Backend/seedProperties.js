const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Property = require('./src/model/Property');

dotenv.config();

const sampleProperties = [
    {
        title: "Modern Minimalist Villa",
        description: "A stunning masterpiece of modern architecture featuring floor-to-ceiling windows, an infinity pool, and smart home integration.",
        price: 2500000,
        location: "Beverly Hills, CA",
        bedrooms: 5,
        bathrooms: 6,
        area: "4,500",
        type: "For Sale",
        images: ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80"]
    },
    {
        title: "Urban Penthouse Suite",
        description: "Luxurious top-floor penthouse with panoramic city views, private elevator access, and a rooftop terrace.",
        price: 1800000,
        location: "New York, NY",
        bedrooms: 3,
        bathrooms: 3,
        area: "2,200",
        type: "For Sale",
        images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"]
    },
    {
        title: "Seaside Retreat",
        description: "Exclusive beachfront property with private access to the shore, expansive decks, and a guest house.",
        price: 3200000,
        location: "Malibu, CA",
        bedrooms: 6,
        bathrooms: 7,
        area: "5,100",
        type: "For Sale",
        images: ["https://images.unsplash.com/photo-1600596542815-6ad4c727dd2c?auto=format&fit=crop&w=1600&q=80"]
    }
];

const seedData = async () => {
    try {
        await connectDB();
        console.log("Connected to DB.");

        // Clear existing to avoid duplicates if needed, or just append
        // await Property.deleteMany({}); 

        await Property.insertMany(sampleProperties);
        console.log("Sample properties added successfully.");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
