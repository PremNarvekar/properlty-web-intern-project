const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: String,

    type: {
      type: String,
      enum: ["image", "video"],
      required: true
    },

    fileUrl: {
      type: String,
      required: true
    },

    uploadedBy: {
      type: String,
      default: "admin"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);
