const express = require("express");
const Appointment = require("../models/Appointment");

const router = express.Router();

// Create appointment
router.post("/appointments", async (req, res) => {
    try {
        const appointment = new Appointment(req.body);

        await appointment.save();

        res.status(201).json({
            message: "Appointment booked successfully",
            appointment: appointment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to book appointment",
            error: error.message
        });
    }
});

module.exports = router;