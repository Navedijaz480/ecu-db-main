const express = require("express");
const router = express.Router();
const sensorController = require("../controllers/sensorController");

router.post("/add_sensor", sensorController.createSensor);

router.get("/get_sensors", sensorController.getAllSensors);

router.get("/:id", sensorController.getSensorById);
router.get("/get_values_by_mac_address/:address", sensorController.getSensorByMacAddress);

router.patch("/:id", sensorController.updatesSensor);
router.put("/:id", sensorController.updateSensor);

router.delete("/:id", sensorController.deleteSensor);

module.exports = router;