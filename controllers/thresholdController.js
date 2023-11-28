const Threshold = require("../models/threshold");

// GET all thresholds
const getAllThresholds = async (req, res) => {
    try {
        const thresholds = await Threshold.find();
        if (thresholds.length === 0) {
            res.json({ error: true, error_message: "Threshold not found" });
        } else {
             res.json({ error: false, thresholds: thresholds });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// GET thresholds by ID
const getThresholdById = async (req, res) => {
    const { id } = req.params;
    try {
        const threshold = await Threshold.findById(id);
        if (!threshold) {
            res.json({ error: true, error_message: "Threshold not found" });
        } else {
             res.json({ error: false, threshold: threshold });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// POST new threshold
const createThreshold = async (req, res) => {
    try {
        const threshold = new Threshold(req.body);
        await threshold.save();
         res.json({
            error: false,
            threshold: threshold,
            success_message: "Data submitted successfully",
        });
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// PUT update threshold by ID
const updateThreshold = async (req, res) => {
    const { id } = req.params;
    try {
        const threshold = await Threshold.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!threshold) {
            res.json({ error: true, message: "Threshold not found" });
        } else {
             res.json({ error: false, threshold: threshold });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// DELETE threshold by ID
const deleteThreshold = async (req, res) => {
    const { id } = req.params;
    try {
        const threshold = await Threshold.findByIdAndDelete(id);
        if (!threshold) {
            res.json({ error: true, error_message: "Threshold not found" });
        } else {
             res.json({
                error: false,
                success_message: "Threshold deleted successfully",
            });
        }
    } catch (error) {
         res.json({ error: error.message });
    }
};

module.exports = {
    getAllThresholds,
    getThresholdById,
    createThreshold,
    updateThreshold,
    deleteThreshold,
};