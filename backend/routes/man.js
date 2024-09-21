const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ManagerModel = require('../model/Manager');
const LoginModel = require('../model/login');

router.post('/', async (req, res) => {
  const { name, email, password, confirmPass } = req.body;

  // Check if passwords match
  if (password !== confirmPass) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if the manager already exists
    const existingManager = await ManagerModel.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Manager already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create manager in ManagerModel
    const manager = await ManagerModel.create({
      name,
      email,
      password: hashedPassword,
      confirmPass: hashedPassword
    });

    // Create login in LoginModel with role as 'manager'
    const login = await LoginModel.create({
      email,
      password: password,
      role: 'manager'
    });

    // Send success response
    res.status(201).json({ message: "Manager created successfully", manager, login });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: 'Error creating manager', error });
  }
});

module.exports = router;
