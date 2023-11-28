const express = require("express");
const router = express.Router();
const thresholdController = require("../controllers/thresholdController");

// Route for creating a new employee
router.post("/add_threshold", thresholdController.createThreshold);

// Route for retrieving all employees
router.get("/get_thresholds", thresholdController.getAllThresholds);

// Route for retrieving a specific employee by ID
router.get("/:id", thresholdController.getThresholdById);

// Route for updating a specific employee by ID
router.put("/:id", thresholdController.updateThreshold);

// Route for deleting a specific employee by ID
router.delete("/:id", thresholdController.deleteThreshold);

module.exports = router;