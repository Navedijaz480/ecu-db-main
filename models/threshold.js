const mongoose = require("mongoose");

const threshold = new mongoose.Schema({
    temperature_threshold: {
        type: Number,
        default: 0.0,
        require: [true, "Temperature threshold is missing"]
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Device ID is required."],
        ref: "Device",
    },
}, { timestamps: true });
module.exports = mongoose.model("Threshold", threshold);