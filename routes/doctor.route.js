const express = require("express");
const router = express.Router();

const Doctor = require("../models/Doctor");

// ===============================
// POST - Add Doctor
// ===============================

router.post("/", async (req, res) => {
    try {
        const doctor = new Doctor(req.body);

        const savedDoctor = await doctor.save();

        res.status(201).json({
            message: "Doctor added successfully",
            doctor: savedDoctor
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add doctor",
            error: error.message
        });
    }
});

// ===============================
// GET - Get All Doctors
// ===============================

router.get("/", async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate("department");

        res.status(200).json(doctors);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get doctors",
            error: error.message
        });
    }
});

module.exports = router;