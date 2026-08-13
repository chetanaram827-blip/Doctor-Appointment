const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Appointment = require("./models/Appointment");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(express.json());
app.use(express.static("public"));

// ===============================
// POST API - Book Appointment
// ===============================

app.post("/appointments", async (req, res) => {
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

// ===============================
// GET API - Get All Appointments
// ===============================

app.get("/appointments", async (req, res) => {
    try {
        const appointments = await Appointment.find();

        res.status(200).json(appointments);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get appointments",
            error: error.message
        });
    }
});

// ===============================
// PUT API - Update Appointment
// ===============================

app.put("/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            message: "Appointment updated successfully",
            appointment: appointment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update appointment",
            error: error.message
        });
    }
});

// ===============================
// DELETE API - Delete Appointment
// ===============================

app.delete("/appointments/:id", async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(
            req.params.id
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        res.status(200).json({
            message: "Appointment deleted successfully",
            appointment: appointment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete appointment",
            error: error.message
        });
    }
});

// ===============================
// MongoDB Connection & Start Server
// ===============================

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });
    })
    .catch((error) => {
        console.log("Database connection failed:", error.message);
    });