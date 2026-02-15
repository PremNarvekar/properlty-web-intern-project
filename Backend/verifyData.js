console.log("Script starting...");
try {
    const mongoose = require('mongoose');
    console.log("mongoose loaded");
    const dotenv = require('dotenv');
    console.log("dotenv loaded");
    const connectDB = require('./config/db');
    console.log("connectDB loaded");
    const Property = require('./src/model/Property');
    console.log("Property model loaded");

    dotenv.config();
    console.log("env config loaded");

    const verifyData = async () => {
        console.log("Connecting to DB...");
        await connectDB();
        console.log("Connected. Fetching properties...");
        const properties = await Property.find({});
        console.log('--- Properties ---');
        console.log(`Found ${properties.length} properties.`);
        properties.forEach(p => {
            console.log(`ID: ${p._id}, Title: "${p.title}", Price: ${p.price}, Images: ${JSON.stringify(p.images)}`);
        });
        process.exit();
    };

    verifyData();
} catch (error) {
    console.error("CRASHED:", error);
}
