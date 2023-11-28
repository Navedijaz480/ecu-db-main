const express = require("express");

const router = express.Router();
const deviceController = require("../controllers/deviceController");

router.post("/add_device", deviceController.createDevice);

router.get("/get_devices", deviceController.getAllDevices);
router.get('/device_by_assigneeID/:assignee', deviceController.getDeviceByAssigneeID);
router.get("/:id", deviceController.getDeviceById);

router.put("/:id", deviceController.updateDevice);

router.put("/update_status/:id", deviceController.updateDeviceStatus);

router.delete("/:id", deviceController.deleteDevice);

module.exports = router;