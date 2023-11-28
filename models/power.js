const mongoose = require("mongoose");

const power = new mongoose.Schema({
    power_status: {
        type: String,
        enum: ["ON", "OFF"],
        default: "OFF",
    },
    last_changed: {
        type: Date,
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Device ID is required."],
        ref: "Device",
    },
}, { timestamps: true });
module.exports = mongoose.model("Power", power);