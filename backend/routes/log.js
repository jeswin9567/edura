const express = require('express');
const router = express.Router();
const LoginModel = require('../model/login');

// Login route
router.post('/', (req, res) => {
  const { email, password } = req.body;

  LoginModel.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: "Incorrect email or password" });
      }

      if (user.password === password) {
        return res.json({ message: "success", role: user.role });
      } else {
        return res.status(401).json({ message: "Incorrect password" });
      }
    })
    .catch(error => res.status(500).json({ message: "Error: " + error.message }));
});

module.exports = router;
