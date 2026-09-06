const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    complaintType: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    file: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Resolved", "Rejected"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Complaint",
  complaintSchema,
  "complaintreport"
);