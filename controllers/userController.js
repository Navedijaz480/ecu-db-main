const User = require("../models/user");
const bcryptjs = require("bcryptjs");

// GET all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (users.length === 0) {
      return res.status(404).json({ error: true, error_message: "User not found" });
    } else {
      return res.status(200).json({ error: false, users: users });
    }

    
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// GET users by ID
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password');
    if (!user) {
      res.json({ error: true, error_message: "User not found" });
    } else {
      res.json({ error: false, user: user });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// POST new user
const createUser = async (req, res) => {
  try {
    const { user_name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({
        error: true,
        error_msg: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new User instance with the hashed password
    const user = new User({
      user_name: user_name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    // Save the user to the database
    await user.save();
    return res.status(200).json({
      error: false,
      user: user,
      success_message: "User created successfully",
    });
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};
const userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      // User not found
      return res.status(404).json({ error: true, error_message: "Invalid email " });
    }

    //  Check if the password is correct using the comparePassword method
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      // Incorrect password
      return res.status(404).json({ error: true, error_message: "Invalid password" });
    }

    // Check if the user's role matches the expected role
    if (user.role !== role) {
      // Role mismatch
      return res.status(404).json({
        error: true,
        error_message: "Invalid role for this user",
      });
    }

    // Authentication successful
    return res.status(200).json({ error: false, user: user, success_message: "Login successful" });
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// PUT update user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) {
      res.json({ error: true, message: "User not found" });
    } else {
      res.json({ error: false, user: user });
    }
  } catch (error) {
    res.json({ error: true, error_message: error.message });
  }
};

// DELETE user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.json({ error: true, error_message: "User not found" });
    } else {
      res.json({
        error: false,
        success_message: "User deleted successfully",
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
};
