const express = require('express');
const User = require('../models/User');
const router = express.Router();

// POST route for signup
router.post('/signup', async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    // Check if the user already exists by email or phone
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const existingUserByPhone = await User.findOne({ phone });
    if (existingUserByPhone) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Create new user with plain text password
    const newUser = new User({ email, phone, password });

    await newUser.save(); // Save the user to the database

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// POST route for login
router.post('/login', async (req, res) => {
  const { email, phone, password } = req.body;

  try {
    // Check if the user exists by email or phone
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (phone) {
      user = await User.findOne({ phone });
    }

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Check if the password matches
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // If everything is correct, send success message
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
