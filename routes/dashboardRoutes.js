const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");

router.get("/:device", dashboardController.getDashboardData);
router.get("/schedule/:device", dashboardController.getScheduleData);
//
// router.get("/:id", dashboardController.getDashboardData);
module.exports = router;