const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true
        },

        doctorName: {
            type: String,
            required: true
        },

        doctor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true
        },

        timeSlot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "TimeSlot",
            required: true
        },

        date: {
            type: String,
            required: true
        },

        time: {
            type: String,
            required: true
        },

        reason: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
