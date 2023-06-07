const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    // Generate the JWT token
    const payload = {
      id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Return the JWT token and user information
    res.status(201).json({ token, user: savedUser });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
};

exports.checkUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (user && isPasswordValid) {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
      });

      // Create a user object with the necessary properties
      const userInfo = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      // Include the user object in the response
      res.status(200).json({ token, refreshToken, user: userInfo });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error Signing in user:", error);
    res.status(500).json({ error: "Error Signing in user" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
    console.log("user from getUserById", user);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
};

exports.authMiddleware = async (req, res, next) => {
  console.log("called");
  try {
    console.log("Request Headers:", req.headers);
    console.log("Authorization Header:", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    req.user = await User.findOne({ email: decoded.email });
    console.log("User in authMiddleware:", req.user);

    next();
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(401).json({ error: "Not authorized" });
  }
};

exports.getUserFromToken = async (req, res) => {
  try {
    console.log("Request Headers:", req.headers);

    if (!req.user) {
      console.log("User not found in request");
      return res.status(404).json({ error: "No user found" });
    }

    console.log("User found in request:", req.user);
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error getting user from token:", error);
    res.status(500).json({ error: "Error getting user from token" });
  }
};
