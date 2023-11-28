const mongoose = require("mongoose");

const schedule = new mongoose.Schema({
    start_time: {
        type: Date,
        require: [true, "Start time is missing"]
    },
    stop_time: {
        type: Date,
        require: [true, "Start time is missing"]
    },
    is_active: {
        type: String,
        enum: ["ON", "OFF"],
        default: "OFF",
    },
    auto_repetitive: {
        type: String,
        enum: ["YES", "NO"],
        default: "NO",
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Device ID is required."],
        ref: "Device",
    },
}, { timestamps: true });
module.exports = mongoose.model("Schedule", schedule);