const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Appointment = require("./models/Appointment");
const TimeSlot = require("./models/TimeSlot");

const hospitalRoutes = require("./routes/hospitalRoutes");
const areaRoutes = require("./routes/areaRoutes");
const departmentRoutes = require("./routes/department.route");
const doctorRoutes = require("./routes/doctor.route");
const timeslotRoutes = require("./routes/timeslot.route");

const app = express();

// ===============================
// Middleware
// ===============================

app.use(express.json());
app.use(express.static("public"));

// ===============================
// Routes
// ===============================

app.use("/areas", areaRoutes);

app.use("/hospitals", hospitalRoutes);

app.use("/departments", departmentRoutes);

app.use("/doctors", doctorRoutes);

app.use("/timeslots", timeslotRoutes);

// ===============================
// Temporary Doctor Test Route
// ===============================

app.get("/test-doctor", (req, res) => {
    res.json({
        message: "Doctor route is connected"
    });
});

// ===============================
// POST API - Book Appointment
// ===============================

app.post("/appointments", async (req, res) => {
    try {

        const {
            patientName,
            doctorName,
            doctor,
            timeSlot,
            date,
            time,
            reason
        } = req.body;

        // Check TimeSlot
        const slot = await TimeSlot.findById(timeSlot);

        if (!slot) {
            return res.status(404).json({
                message: "Time slot not found"
            });
        }

        // Check if TimeSlot is already booked
        if (slot.isBooked) {
            return res.status(400).json({
                message: "Time slot is already booked"
            });
        }

        // Create Appointment
        const appointment = new Appointment({
            patientName,
            doctorName,
            doctor,
            timeSlot,
            date,
            time,
            reason
        });

        // Save Appointment
        await appointment.save();

        // Mark TimeSlot as booked
        slot.isBooked = true;

        // Save TimeSlot
        await slot.save();

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

        const appointments = await Appointment.find()
            .populate("doctor")
            .populate("timeSlot");

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

        // 1. Find the appointment
        const appointment = await Appointment.findById(
            req.params.id
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found"
            });
        }

        // 2. Find the TimeSlot used by this appointment
        const slot = await TimeSlot.findById(
            appointment.timeSlot
        );

        // 3. Make the TimeSlot available again
        if (slot) {
            slot.isBooked = false;
            await slot.save();
        }

        // 4. Delete the appointment
        await Appointment.findByIdAndDelete(
            req.params.id
        );

        // 5. Send success response
        res.status(200).json({
            message: "Appointment deleted successfully and time slot is now available",
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

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB connected successfully");

        app.listen(5000, () => {
            console.log("Server running on port 5000");
        });

    })
    .catch((error) => {

        console.log(
            "Database connection failed:",
            error.message
        );

    });