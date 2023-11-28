const mongoose = require("mongoose");

const device = new mongoose.Schema(
  {
    device_name: {
      type: String,
      required: [true, "Device name is missing"], 
    },
    mac_address: {
      type: String,
      required: [true, "MAC Address is missing"],
    },
    device_status: {
      type: String,
      enum: ["ON", "OFF"],
      default: "OFF",
    },
    registered_time: {
      type: Date,
      default: Date.now(),
    },
    assignee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    request: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Device", device);
