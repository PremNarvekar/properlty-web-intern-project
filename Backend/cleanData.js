const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Property = require('./src/model/Property');

dotenv.config();

const cleanData = async () => {
    try {
        await connectDB();
        console.log("Connected. Cleaning data...");

        // Delete the specific bad property
        const result = await Property.deleteMany({ title: "3" });
        console.log(`Deleted ${result.deletedCount} properties with title '3'.`);

        // Also delete if title is numeric and price is very low, just in case
        const result2 = await Property.deleteMany({ price: { $lt: 10 } });
        console.log(`Deleted ${result2.deletedCount} properties with price < 10.`);

        console.log('--- Remaining Properties ---');
        const properties = await Property.find({});
        properties.forEach(p => {
            console.log(`ID: ${p._id}, Title: "${p.title}", Price: ${p.price}`);
        });

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

cleanData();
