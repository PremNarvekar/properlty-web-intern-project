const Property = require("../model/Property");

exports.addProperty = async (req, res) => {
    try {
        const { title, description, price, location, bedrooms, bathrooms, area, type } = req.body;

        let imagePaths = [];
        if (req.files && req.files.length > 0) {
            imagePaths = req.files.map(file => `/uploads/images/${file.filename}`);
        }

        if (req.body.imageUrls) {
            const urls = Array.isArray(req.body.imageUrls)
                ? req.body.imageUrls
                : [req.body.imageUrls];

            const validUrls = urls.filter(url => url && url.trim() !== "");
            imagePaths = [...imagePaths, ...validUrls];
        }

        const property = await Property.create({
            title,
            description,
            price,
            location,
            bedrooms,
            bathrooms,
            area,
            type,
            images: imagePaths
        });

        res.status(201).json(property);
    } catch (err) {
        console.error("Error adding property:", err);
        res.status(500).json({ message: "Server error while adding property." });
    }
};

exports.updateProperty = async (req, res) => {
    const { id } = req.params;

    const updated = await Property.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    );

    res.json({ message: "Property updated", updated });
};

exports.deleteProperty = async (req, res) => {
    const { id } = req.params;

    await Property.findByIdAndDelete(id);

    res.json({ message: "Property deleted" });
};

exports.getAllProperties = async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
};
