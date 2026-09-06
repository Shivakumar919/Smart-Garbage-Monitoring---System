// models/Bin.js
const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  binId: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    lat: Number,
    lng: Number
  },
  fillLevel: {
    type: Number,
    default: 0
  },
  gasLevel: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: "Active"
  }
});

module.exports = mongoose.model("Bin", binSchema);