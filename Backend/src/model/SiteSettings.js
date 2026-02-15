const mongoose = require("mongoose");

const siteSettingsSchema = new mongoose.Schema(
    {
        heroImage: {
            type: String,
            default: "https://images.unsplash.com/photo-1549517045-bc93de075e53?q=80&w=2072&auto=format&fit=crop"
        },
        heroTitle: {
            type: String,
            default: "Discover Refined\nLiving."
        },
        heroSubtitle: {
            type: String,
            default: "Where visionary design meets timeless elegance — curated residences for the discerning few."
        },

        infoTitle: {
            type: String,
            default: "Crafted with\nIntention."
        },
        infoText: {
            type: String,
            default: "Every residence in our portfolio is handpicked for its architectural distinction, premium craftsmanship, and extraordinary sense of place. We don't just sell properties — we connect people with spaces that elevate how they live."
        },
        infoImage: {
            type: String,
            default: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
        },

        luxuryTitle: {
            type: String,
            default: "Residences Beyond\nthe Ordinary."
        },
        luxuryDescription: {
            type: String,
            default: "Featured Collection"
        },
        luxuryImage: {
            type: String,
            default: "https://images.unsplash.com/photo-1600596542815-27b88e3c35eb?q=80&w=2072&auto=format&fit=crop"
        },

        contactEmail: {
            type: String,
            default: "sean@kpropertys.com"
        },
        phoneNumber: {
            type: String,
            default: "+1 246 232 4444"
        },
        aboutText: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("SiteSettings", siteSettingsSchema);
