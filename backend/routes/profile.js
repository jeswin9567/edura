// profile.js (New file for profile routes)
const express = require('express');
const router = express.Router();
const UserModel = require('../model/User'); // Import UserModel
const jwt = require('jsonwebtoken');

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: "No token provided." });
  }

  jwt.verify(token, 'sceret_key', (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: "Failed to authenticate token." });
    }
    req.email = decoded.email; // Save email for further use
    next();
  });
};

// Profile route
router.get('/', verifyToken, (req, res) => {
  UserModel.findOne({ email: req.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        education: user.education,
        courses: user.courses,
        marks: user.marks
      });
    })
    .catch(error => res.status(500).json({ message: "Error: " + error.message }));
});

// In profile.js
router.put('/', verifyToken, (req, res) => {
    const { name, phone, education, courses, marks } = req.body;
  
    UserModel.findOneAndUpdate(
      { email: req.email },
      { name, phone, education, courses, marks },
      { new: true, runValidators: true } // Returns the updated document
    )
      .then(user => {
        if (!user) {
          return res.status(404).json({ message: "User not found." });
        }
        res.json({ message: "Profile updated successfully", user });
      })
      .catch(error => res.status(500).json({ message: "Error: " + error.message }));
  });
  

module.exports = router;
