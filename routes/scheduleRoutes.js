const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/scheduleController");

router.post("/add_schedule", scheduleController.createSchedule);

router.get("/get_schedules", scheduleController.getAllSchedules);

router.get("/:id", scheduleController.getScheduleById);
router.get("/get_values_by_mac_address/:address", scheduleController.getScheduleByMacAddress);

router.put("/:id", scheduleController.updateSchedule);

router.delete("/:id", scheduleController.deleteSchedule);

module.exports = router;