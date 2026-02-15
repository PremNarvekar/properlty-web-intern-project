const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    bedrooms: { type: Number },
    bathrooms: { type: Number },
    area: { type: String },
    type: { type: String, default: "For Sale" },

    images: [
      {
        type: String
      }
    ],

    createdBy: {
      type: String,
      default: "admin"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);
