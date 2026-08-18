const express = require("express");
const Hospital = require("../models/Hospital");
const Area = require("../models/Area");

const router = express.Router();

// =====================================
// Helper - Convert Area ID to Area Name
// =====================================

async function convertAreaToName(hospital) {

    if (!hospital.area) {
        return hospital;
    }

    const areaValue = hospital.area.toString();

    // Only accept exactly 24 hexadecimal characters
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(areaValue);

    if (isObjectId) {

        const areaData = await Area.findById(areaValue).lean();

        if (areaData) {
            hospital.area = areaData.name;
        }
    }

    // If area is text like "Magunta Layout",
    // keep it unchanged.

    return hospital;
}


// =====================================
// POST - Add Hospital
// =====================================

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


// =====================================
// GET - Get All Hospitals
// =====================================

router.get("/", async (req, res) => {

    try {

        const hospitals = await Hospital.find().lean();

        for (const hospital of hospitals) {

            await convertAreaToName(hospital);

        }

        res.status(200).json(hospitals);

    } catch (error) {

        res.status(500).json({
            message: "Failed to get hospitals",
            error: error.message
        });

    }

});


// =====================================
// GET - Search Hospitals
// =====================================

router.get("/search", async (req, res) => {

    try {

        const { area, city } = req.query;

        const filter = {};

        // Search by Area Name
        if (area) {

            const areas = await Area.find({
                name: {
                    $regex: area,
                    $options: "i"
                }
            });

            const areaIds = areas.map(function (item) {
                return item._id;
            });

            filter.area = {
                $in: areaIds
            };
        }

        // Search by City
        if (city) {

            filter.city = {
                $regex: city,
                $options: "i"
            };

        }

        const hospitals = await Hospital
            .find(filter)
            .lean();

        for (const hospital of hospitals) {

            await convertAreaToName(hospital);

        }

        res.status(200).json(hospitals);

    } catch (error) {

        res.status(500).json({
            message: "Hospital search failed",
            error: error.message
        });

    }

});


// =====================================
// PUT - Update Hospital
// =====================================

router.put("/:id", async (req, res) => {

    try {

        const hospital = await Hospital.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!hospital) {

            return res.status(404).json({
                message: "Hospital not found"
            });

        }

        res.status(200).json({
            message: "Hospital updated successfully",
            hospital: hospital
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to update hospital",
            error: error.message
        });

    }

});


// =====================================
// DELETE - Delete Hospital
// =====================================

router.delete("/:id", async (req, res) => {

    try {

        const hospital = await Hospital.findByIdAndDelete(
            req.params.id
        );

        if (!hospital) {

            return res.status(404).json({
                message: "Hospital not found"
            });

        }

        res.status(200).json({
            message: "Hospital deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete hospital",
            error: error.message
        });

    }

});


module.exports = router;