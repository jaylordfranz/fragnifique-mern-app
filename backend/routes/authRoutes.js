// Existing code
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Google OAuth
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

// Normal Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Send user data on successful login
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Google OAuth (Updated to handle login as well)
router.post('/google-login', async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const { name, email } = ticket.getPayload();
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        password: null,  // For Google login, we don't save a password
      });
      await user.save();
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error("Error during Google login:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// **Normal Registration Route**
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password for normal registration
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    user = new User({
      name,
      email,
      password: hashedPassword, // Save the hashed password
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error("Error during registration:", error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;