const mongoose = require("mongoose");

const sensor = new mongoose.Schema({
    humidity: {
        type: [Number],
        default: [0.0],
        require: [true, "Humidity is missing"]
    },
    temperature: {
        type: [Number],
        default: [0.0],
        require: [true, "temperature is missing"]
    },
    pool_temperature:{
        type: [Number],
        default: [0.0],
        require: [true, "pool temperature is missing"]
    },
    time: {
        type: [Date],
        require: [true, "time is missing"]
    },
    ambient_temperature:{
        type: [Number],
        default: [0.0],
        require: [true, "pool temperature is missing"]
    },
    device: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Device ID is required."],
        ref: "Device",
    },
});
module.exports = mongoose.model("Sensor", sensor);