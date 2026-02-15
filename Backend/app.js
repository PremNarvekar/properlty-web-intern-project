const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./src/routes/routes");
const adminPropertyRoutes = require("./src/routes/adminPropertyRoutes");
const userPropertyRoutes = require("./src/routes/userPropertyRoutes");
const settingsRoutes = require("./src/routes/settingsRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminPropertyRoutes);
app.use("/api", userPropertyRoutes);
app.use("/api", settingsRoutes);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

module.exports = app;
