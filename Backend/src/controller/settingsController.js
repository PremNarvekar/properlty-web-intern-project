const SiteSettings = require("../model/SiteSettings");

exports.getSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne();
        if (!settings) {
            settings = new SiteSettings();
            await settings.save();
        }
        res.status(200).json(settings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSettings = async (req, res) => {
    try {
        let settings = await SiteSettings.findOne();
        if (!settings) {
            settings = new SiteSettings();
        }

        if (req.file) {
            settings.heroImage = `/uploads/images/${req.file.filename}`;
        } else if (req.body.heroImage) {
            settings.heroImage = req.body.heroImage;
        }

        const fields = [
            'heroTitle', 'heroSubtitle', 'heroImage',
            'infoTitle', 'infoText', 'infoImage',
            'luxuryTitle', 'luxuryDescription', 'luxuryImage',
            'contactEmail', 'phoneNumber', 'aboutText'
        ];

        fields.forEach(field => {
            if (req.body[field] !== undefined) {
                settings[field] = req.body[field];
            }
        });

        await settings.save();
        res.status(200).json(settings);
    } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: error.message });
    }
};
