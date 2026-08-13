const express = require("express");
const Hospital = require("../models/Hospital");

const router = express.Router();

// ===============================
// POST - Add Hospital
// ===============================

router.post("/", async (req, res) => {
    try {
        const hospital = new Hospital(req.body);

        await hospital.save();

        res.status(201).json({
            message: "Hospital added successfully",
            hospital: hospital
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add hospital",
            error: error.message
        });
    }
});

// ===============================
// GET - Get All Hospitals
// ===============================

router.get("/", async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        res.status(200).json(hospitals);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get hospitals",
            error: error.message
        });
    }
});

// ===============================
// GET - Search Hospital by Area or City
// ===============================

router.get("/search", async (req, res) => {
    try {
        const { area, city } = req.query;

        const filter = {};

        if (area) {
            filter.area = {
                $regex: area,
                $options: "i"
            };
        }

        if (city) {
            filter.city = {
                $regex: city,
                $options: "i"
            };
        }

        const hospitals = await Hospital.find(filter);

        res.status(200).json(hospitals);

    } catch (error) {
        res.status(500).json({
            message: "Hospital search failed",
            error: error.message
        });
    }
});

module.exports = router;