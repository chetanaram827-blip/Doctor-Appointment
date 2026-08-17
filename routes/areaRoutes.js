const express = require("express");
const router = express.Router();

const Area = require("../models/Area");

router.post("/", async (req, res) => {
    try {
        const area = new Area(req.body);
        const savedArea = await area.save();

        res.status(201).json({
            message: "Area added successfully",
            area: savedArea
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add area",
            error: error.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const areas = await Area.find();

        res.status(200).json(areas);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get areas",
            error: error.message
        });
    }
});

module.exports = router;