const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const ManagerModel = require('../model/Manager');
const nodemailer = require('nodemailer');
const LoginModel = require('../model/login');
const dns = require('dns');
const dotenv = require('dotenv');

dotenv.config();

// Function to validate email domain using DNS
const validateEmailDomain = (email) => {
  const domain = email.split('@')[1]; // Extract domain from email
  return new Promise((resolve, reject) => {
    // Lookup MX records for the domain
    dns.resolveMx(domain, (err, addresses) => {
      if (err || addresses.length === 0) {
        resolve(false); // Domain is not valid if there's an error or no MX records
      } else {
        resolve(true); // Domain is valid
      }
    });
  });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/', async (req, res) => {
  const { name, email, password, confirmPass } = req.body;

  // Check if passwords match
  if (password !== confirmPass) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  // Validate email domain
  const isDomainValid = await validateEmailDomain(email);
  if (!isDomainValid) {
    return res.status(400).json({ message: 'Invalid email domain' });
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

    // Prepare email options
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Ensure you use the environment variable for sender email
      to: email,  // Send to the manager's email
      subject: 'Manager Account Created',
      text: `Hello ${name},\n\nYour manager account has been created successfully.\n\nHere are your login credentials:\nEmail: ${email}\nPassword: ${password}\n\nPlease change your password after your first login.\n\nBest regards,\nAdmin Team`
    };

    // Send email with login details
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
        return res.status(500).json({ message: 'Manager created but error sending email', error });
      } else {
        console.log('Email sent:', info.response);
        res.status(201).json({ message: "Manager created and email sent successfully", manager, login });
      }
    });

  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: 'Error creating manager', error });
  }
});

module.exports = router;
