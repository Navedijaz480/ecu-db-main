const Sensor = require("../models/sensor");
const dayjs = require("dayjs");

// GET all sensors
const getAllSensors = async (req, res) => {
  try {
    const sensors = await Sensor.find().populate("device");
    if (sensors.length === 0) {
      res.json({ error: true, error_message: "Sensor not found" });
    } else {
      res.json({ error: false, sensors: sensors });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// GET sensors by ID
const getSensorById = async (req, res) => {
  const { id } = req.params;
  try {
    const sensor = await Sensor.findById(id).populate("device");
    if (!sensor) {
      res.json({ error: true, error_message: "Sensor not found" });
    } else {
      res.json({ error: false, sensor: sensor });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

const getSensorByMacAddress = async (req, res) => {
  const { address } = req.params;
  try {
    const sensor = await Sensor.find().populate({
      path: "device",
      match: { mac_address: address },
    });
    if (!sensor) {
      res.json({ error: true, error_message: "Sensor not found" });
    } else {
      res.json({ error: false, sensor: sensor });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// POST new sensor
const createSensor = async (req, res) => {
  try {
    const sensor = new Sensor(req.body);
    await sensor.save();
    res.json({
      error: false,
      sensor: sensor,
      success_message: "Data submitted successfully",
    });
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// PUT update sensor by ID
const updateSensor = async (req, res) => {
  const { id } = req.params;

  try {
    let sensor = await Sensor.findById(id);

    if (!sensor) {
      return res.json({ error: true, message: "Sensor not found" });
    }

    const convertToNumber = (value) => {
      const parsedValue = parseFloat(value);
      return isNaN(parsedValue) ? 0.0 : parsedValue;
    };

    const humidity = convertToNumber(req.body.humidity);
    const temperature = convertToNumber(req.body.temperature);
    const ambientTemperature = convertToNumber(req.body.ambient_temperature);
    const poolTemperature = convertToNumber(req.body.pool_temperature);

    sensor.humidity.push(humidity);
    sensor.temperature.push(temperature);
    sensor.ambient_temperature.push(ambientTemperature);
    sensor.pool_temperature.push(poolTemperature);
    const time = req.body.time;
      sensor.time.push(time);

    // Save the updated document
    sensor = await sensor.save();

    res.json({ error: false, sensor: sensor });
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

const updatesSensor = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the sensor by ID
    let sensor = await Sensor.findById(id).sort({ createdAt: -1 }).limit(1);

    if (!sensor) {
      return res.json({ error: true, message: "Sensor not found" });
    }

    // Assuming your existing createdAt date is in a variable, for example:
    const createdAtDate = sensor.createdAt;

    // Parse the createdAt date using dayjs and set to the start of the day
    const createdAt = dayjs(createdAtDate).startOf("day");

    // Get the current date and set to the start of the day
    const currentDate = dayjs().startOf("day");

    // Compare createdAt with current date
    if (createdAt.isBefore(currentDate)) {
      //   console.log('The createdAt date is before the current date.');
      sensor = new Sensor(req.body);
    } else if (createdAt.isSame(currentDate)) {
      //   console.log('The createdAt date is equal to the current date.');
      // sensor = await Sensor.findByIdAndUpdate(id, req.body, {
      //   new: true,
      // });
      const updatedSensor = await Sensor.findByIdAndUpdate(
        req.params.id,
        {
          $push: { values: { $each: req.body.values } }, // Assuming values is an array of numbers in your request body
        },
        { new: true } // Set to true to return the updated document
      );  if (updatedSensor) {
        res.json({
          error: false,
          success_msg: "Values pushed successfully",
          sensor: updatedSensor,
        });
      } else {
        res.json({
          error: true,
          error_msg: "No Sensor Found",
        });
      }
    } else {
      console.log("The createdAt date is after the current date.");
    }

     await sensor.save();

    // Save the updated sensor

    return res.json({ error: false, sensor });
  } catch (error) {
    return res.json({ error: true, error_message: error.message });
  }
};

// DELETE sensor by ID
const deleteSensor = async (req, res) => {
  const { id } = req.params;
  try {
    const sensor = await Sensor.findByIdAndDelete(id);
    if (!sensor) {
      res.json({ error: true, error_message: "Sensor not found" });
    } else {
      res.json({
        error: false,
        success_message: "Sensor deleted successfully",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  deleteSensor,
  getSensorByMacAddress,
  updatesSensor,
};
