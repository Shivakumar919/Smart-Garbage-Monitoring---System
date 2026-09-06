const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    pickupAddress: {
      type: String,
      required: true,
      trim: true,
    },

    wasteType: {
      type: String,
      required: true,
    },

    timeSlot: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "CollectionRequest",
  collectionSchema,
  "collectionreq"
);