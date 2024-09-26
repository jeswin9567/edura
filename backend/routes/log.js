const express = require('express');
const router = express.Router();
const LoginModel = require('../model/login');
const jwt=require("jsonwebtoken");
require("dotenv").config;

// Login route
router.post('/', (req, res) => {
  const { email, password } = req.body;

  LoginModel.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Incorrect email or password" });
      }

      if (user.password === password) {
        const token = jwt.sign({ email: user.email }, 'sceret_key'); 
        return res.json({ message: "success", role: user.role,token:token });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    })
    .catch(error => res.status(500).json({ message: "Error: " + error.message }));
});

module.exports = router;
