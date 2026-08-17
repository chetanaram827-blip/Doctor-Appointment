const express = require("express");
const router = express.Router();

const Department = require("../models/Department");

// ===============================
// POST - Add Department
// ===============================

router.post("/", async (req, res) => {
    try {
        const department = new Department(req.body);

        const savedDepartment = await department.save();

        res.status(201).json({
            message: "Department added successfully",
            department: savedDepartment
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add department",
            error: error.message
        });
    }
});

// ===============================
// GET - Get All Departments
// ===============================

router.get("/", async (req, res) => {
    try {
        const departments = await Department.find()
            .populate("hospital");

        res.status(200).json(departments);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get departments",
            error: error.message
        });
    }
});

module.exports = router;