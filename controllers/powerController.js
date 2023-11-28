const Power = require("../models/power");

// GET all powers
const getAllPowers = async (req, res) => {
    try {
        const powers = await Power.find().populate("device");
        if (powers.length === 0) {
            res.json({ error: true, error_message: "Power not found" });
        } else {
             res.json({ error: false, powers: powers });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// GET powers by ID
const getPowerById = async (req, res) => {
    const { id } = req.params;
    try {
        const power = await Power.findById(id).populate("device");
        if (!power) {
            res.json({ error: true, error_message: "Power not found" });
        } else {
             res.json({ error: false, power: power });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// POST new power
const createPower = async (req, res) => {
    try {
        const power = new Power(req.body);
        await power.save();
         res.json({
            error: false,
            power: power,
            success_message: "Data submitted successfully",
        });
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// PUT update power by ID
const updatePower = async (req, res) => {
    const { id } = req.params;
    try {
        const power = await Power.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!power) {
            res.json({ error: true, message: "Power not found" });
        } else {
             res.json({ error: false, power: power });
        }
    } catch (error) {
         res.json({ error: true, error_message: error.message });
    }
};

// DELETE power by ID
const deletePower = async (req, res) => {
    const { id } = req.params;
    try {
        const power = await Power.findByIdAndDelete(id);
        if (!power) {
            res.json({ error: true, error_message: "Power not found" });
        } else {
             res.json({
                error: false,
                success_message: "Power deleted successfully",
            });
        }
    } catch (error) {
         res.json({ error: error.message });
    }
};

module.exports = {
    getAllPowers,
    getPowerById,
    createPower,
    updatePower,
    deletePower,
};