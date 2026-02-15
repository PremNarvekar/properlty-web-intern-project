const express = require("express");
const router = express.Router();
const Property = require("../model/Property.js");

router.get("/properties", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

router.get("/property/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
});

module.exports = router;
