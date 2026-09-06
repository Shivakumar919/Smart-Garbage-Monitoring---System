const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bins = require("./bindata/sec1");

const Collection = require("./Database/request");
const Complaint = require("./Database/Complaint");

const app = express();
const multer = require("multer");
app.use(express.json());
const upload = multer({
  dest: "uploads/",
});

app.use(cors());
app.use(express.json());

// ==========================================
// MONGODB CONNECTION
// ==========================================

mongoose
  .connect("mongodb://127.0.0.1:27017/smart-bin")
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// ==========================================
// BIN API
// ==========================================

// Get all bins
app.get("/api/bindata", (req, res) => {
  res.json(bins);
});

// Update multiple bins
app.put("/api/bins", (req, res) => {
  const { bins: updatedBins } = req.body;

  if (!Array.isArray(updatedBins)) {
    return res.status(400).json({
      message: "bins must be an array",
    });
  }

  updatedBins.forEach((updated) => {
    const bin = bins.find((b) => b.id === updated.id);

    if (bin) {
      bin.fillLevel = Number(updated.fillLevel);

      if (bin.fillLevel >= 80) {
        bin.status = "Full";
      } else if (bin.fillLevel >= 60) {
        bin.status = "Warning";
      } else {
        bin.status = "Normal";
      }

      bin.lastUpdated = new Date().toISOString();
    }
  });

  res.json({
    message: "All bins updated successfully",
    bins,
  });
});

// ==========================================
// COLLECTION REQUEST
// ==========================================

// Put collection request
app.put("/api/collection/:id", async (req, res) => {
  try {
    const request = await Collection.findByIdAndUpdate(
      req.params.id,
      {
        seen: req.body.seen,
        solved: req.body.solved,
        status: req.body.solved ? "Completed" : "Pending",
      },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET collection requests
app.get("/api/collection", async (req, res) => {
  try {
    const collections = await Collection.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: collections,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch collection requests",
    });
  }
});

// ==========================================
// COMPLAINT
// ==========================================
// Put complaint
app.put("/api/complaints/:id", async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        seen: req.body.seen,
        solved: req.body.solved,
        status: req.body.solved ? "Resolved" : "Pending",
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found",
      });
    }

    res.json({
      success: true,
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET complaints
app.get("/api/complaints", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: complaints,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch complaints",
    });
  }
});

// ==========================================
// SERVER
// ==========================================

app.listen(5000, () => {
  console.log("Server running on port 5000");
});