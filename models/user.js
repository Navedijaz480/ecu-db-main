const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');
const user = new mongoose.Schema({
    user_name: {
        type: String,
        require: [true, "User name is missing"]
    },
    email: {
        type: String,
        require: [true, "Email is missing"]
    },
    password: {
        type: String,
        require: [true, "Password is missing"]
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
    },
}, { timestamps: true });

//for password
user.methods.comparePassword = async function (password) {
    try {
      return await bcryptjs.compare(password, this.password);
    } catch (error) {
      throw new Error(error);
    }
  };

module.exports = mongoose.model("User", user);