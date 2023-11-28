const Sensor = require("../models/sensor");
const Threshold = require("../models/threshold");
const Power = require("../models/power");
const Schedule = require("../models/schedule");

//
const getDashboardData = async (req, res) => {
  const { device } = req.params;
  try {
    const sensor = await Sensor.find({ device: device }).sort({ createdAt: -1 }).limit(7);
    const threshold = await Threshold.findOne({ device: device });
    const power = await Power.findOne({ device: device });
    const schedule = await Schedule.find({ device: device });

    
    res.json({ error: false, 
        data:{
        sensor, threshold, power ,schedule
    } });
    
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

const getScheduleData = async (req, res) => {
  const { device } = req.params;
  try {
  
    const schedule = await Schedule.find({ device: device });

    
    res.json({ error: false, 
        data:{
        schedule
    } });
    
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};


module.exports = {
  getDashboardData,
  getScheduleData
};
