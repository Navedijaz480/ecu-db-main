const Schedule = require("../models/schedule");

// GET all schedules
const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find().populate("device");
        if (schedules.length === 0) {
            res.json({ error: true, error_message: "Schedule not found" });
        } else {
             res.json({ error: false, schedules: schedules });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// GET schedules by ID
const getScheduleById = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await Schedule.findById(id).populate("device");
        if (!schedule) {
            res.json({ error: true, error_message: "Schedule not found" });
        } else {
             res.json({ error: false, schedule: schedule });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};


const getScheduleByMacAddress = async (req, res) => {
    const { address } = req.params;
    try {
        const sensor = await Schedule.find().populate({ path: "device", match: { mac_address: address } });
        if (!sensor) {
            res.json({ error: true, error_message: "Sensor not found" });
        } else {
             res.json({ error: false, sensor: sensor });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// POST new schedule
const createSchedule = async (req, res) => {
    try {
        const schedule = new Schedule(req.body);
        await schedule.save();
         res.json({
            error: false,
            schedule: schedule,
            success_message: "Data submitted successfully",
        });
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// PUT update schedule by ID
const updateSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await Schedule.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!schedule) {
            res.json({ error: true, message: "Schedule not found" });
        } else {
             res.json({ error: false, schedule: schedule });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// DELETE schedule by ID
const deleteSchedule = async (req, res) => {
    const { id } = req.params;
    try {
        const schedule = await Schedule.findByIdAndDelete(id);
        if (!schedule) {
            res.json({ error: true, error_message: "Schedule not found" });
        } else {
             res.json({
                error: false,
                success_message: "Schedule deleted successfully",
            });
        }
    } catch (error) {
         res.json({ error: error.message });
    }
};

module.exports = {
    getAllSchedules,
    getScheduleById,
    createSchedule,
    updateSchedule,
    deleteSchedule,
    getScheduleByMacAddress
};