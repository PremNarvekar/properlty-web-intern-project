const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/images");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/videos");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = multer({
    storage: imageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadVideo = multer({
    storage: videoStorage,
    limits: { fileSize: 100 * 1024 * 1024 }
});

module.exports = { uploadImage, uploadVideo };
