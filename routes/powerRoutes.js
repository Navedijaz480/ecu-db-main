const express = require("express");
const router = express.Router();
const powerController = require("../controllers/powerController");

// Route for creating a new employee
router.post("/add_power", powerController.createPower);

// Route for retrieving all employees
router.get("/get_powers", powerController.getAllPowers);

// Route for retrieving a specific employee by ID
router.get("/:id", powerController.getPowerById);

// Route for updating a specific employee by ID
router.put("/:id", powerController.updatePower);

// Route for deleting a specific employee by ID
router.delete("/:id", powerController.deletePower);

module.exports = router;