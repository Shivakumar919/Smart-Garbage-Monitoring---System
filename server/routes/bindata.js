// routes/binRoutes.js
const express = require("express");
const router = express.Router();
const Bin = require("../models/Bin");

router.post("/", async (req, res) => {
  try {
    const bin = await Bin.create(req.body);

    res.status(201).json({
      success: true,
      bin
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const bins = await Bin.find();

    res.json({
      success: true,
      bins
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;