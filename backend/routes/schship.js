const express = require('express');
const router = express.Router();
const ScholarshipModel = require('../model/scholarship'); // Correct model import

// POST route to create a new scholarship
router.post('/', async (req, res) => {
  const { name, description, award, eligibility, document, startdate, enddate, link, howToApply } = req.body;

  // Validate required fields
  if (!name || !description || !award || !eligibility || !startdate || !enddate) {
    return res.status(400).json({ message: 'All required fields must be filled.' });
  }

  try {
    // Create new Scholarship document
    const newScholarship = new ScholarshipModel({
      name,
      description,
      award,
      eligibility,
      document,
      startdate,
      enddate,
      link,
      howToApply
    });

    // Save to database
    await newScholarship.save();

    // Return success response
    res.status(201).json({
      message: 'Scholarship created successfully',
      scholarship: newScholarship
    });

  } catch (error) {
    console.error('Error creating scholarship:', error.message);
    res.status(500).json({ message: 'Server error, unable to create scholarship' });
  }
});

module.exports = router;
