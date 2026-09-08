const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");

const bins = require("./bindata/sec1");
const Collection = require("./Database/request");
const Complaint = require("./Database/Complaint");

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({
  dest: "uploads/",
});

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
// TEST API
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "Smart Garbage Monitoring System API is running",
  });
});

// ==========================================
// BIN API
// ==========================================

// Get all bins
app.get("/api/bindata", (req, res) => {
  res.json(bins);
});

// ==========================================
// UPDATE MULTIPLE BINS
// ==========================================

app.put("/api/bins", (req, res) => {
  try {
    // Prevent req.body undefined error
    const body = req.body || {};
    const updatedBins = body.bins;

    // Check whether bins is an array
    if (!Array.isArray(updatedBins)) {
      return res.status(400).json({
        success: false,
        message: "bins must be an array",
        example: {
          bins: [
            {
              id: "BIN-001",
              fillLevel: 85,
            },
          ],
        },
      });
    }

    // Update each bin
    updatedBins.forEach((updated) => {
      const bin = bins.find(
        (b) => String(b.id) === String(updated.id)
      );

      if (bin) {
        const level = Number(updated.fillLevel);

        // Validate fill level
        if (isNaN(level) || level < 0 || level > 100) {
          return;
        }

        bin.fillLevel = level;

        // Set status automatically
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
      success: true,
      message: "All bins updated successfully",
      bins: bins,
    });
  } catch (error) {
    console.error("Bin update error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update bins",
      error: error.message,
    });
  }
});

// ==========================================
// GET BINS NEEDING COLLECTION
// ==========================================

// Bins with fill level >= 70%
app.get("/api/bins/collection", (req, res) => {
  try {
    const collectionBins = bins.filter(
      (bin) => Number(bin.fillLevel) >= 70
    );

    res.json({
      success: true,
      count: collectionBins.length,
      bins: collectionBins,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get collection bins",
      error: error.message,
    });
  }
});

// ==========================================
// COLLECTION REQUEST
// ==========================================

// Update collection request
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
    console.error("Collection update error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// GET COLLECTION REQUESTS
// ==========================================

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

// Update complaint
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
    console.error("Complaint update error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// ==========================================
// GET COMPLAINTS
// ==========================================

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
// 404 HANDLER
// ==========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ==========================================
// ERROR HANDLER
// ==========================================

app.use((error, req, res, next) => {
  console.error(error);

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
});

// ==========================================
// SERVER
// ==========================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});