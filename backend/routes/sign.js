const express = require('express');
const router = express.Router();
const UserModel = require('../model/User');
const LoginModel = require('../model/login');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

let OTPs = {}; // Temporary store for OTPs
const OTP_EXPIRY_TIME = 30 * 1000; // 30 seconds in milliseconds

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email service
  auth: {
    user: 'jeswinmathew2025@mca.ajce.in', // Your email
    pass: 'Zoom#2023', // Your email password or app password
  },
});

// Signup route
router.post('/', async (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  // Validate if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  // Check if user already exists
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Generate OTP
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpDetails = {
    otp,
    name,
    phone,
    password,
    generatedAt: Date.now(), // Store the time when OTP is generated
  };
  OTPs[email] = otpDetails; // Store OTP and user details

  // Send OTP email
  await transporter.sendMail({
    from: 'your-email@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}`,
  });

  // Respond with a message to enter OTP
  res.status(200).json({ message: "OTP sent to your email", email });
});

// OTP Verification Route
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (OTPs[email]) {
    const { otp: storedOtp, generatedAt } = OTPs[email];

    // Check if the OTP is valid and not expired
    if (storedOtp === otp && (Date.now() - generatedAt) <= OTP_EXPIRY_TIME) {
      const { name, phone, password } = OTPs[email]; // Get stored user details
      try {
        const user = await UserModel.create({ name, email, phone, password });
        const login = await LoginModel.create({ email, password, role: 'user' });
        delete OTPs[email]; // Remove OTP after successful registration

        res.status(201).json({ message: "User created successfully", user, login });
      } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
      }
    } else {
      res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } else {
    res.status(400).json({ message: "Invalid OTP" });
  }
});

module.exports = router;
