const express = require("express");
const router = express.Router();

const TimeSlot = require("../models/TimeSlot");

// ===============================
// POST - Add Time Slot
// ===============================

router.post("/", async (req, res) => {
    try {
        const timeSlot = new TimeSlot(req.body);

        const savedTimeSlot = await timeSlot.save();

        res.status(201).json({
            message: "Time slot added successfully",
            timeSlot: savedTimeSlot
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add time slot",
            error: error.message
        });
    }
});

// ===============================
// GET - Get All Time Slots
// ===============================

router.get("/", async (req, res) => {
    try {
        const timeSlots = await TimeSlot.find()
            .populate("doctor");

        res.status(200).json(timeSlots);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get time slots",
            error: error.message
        });
    }
});

module.exports = router;