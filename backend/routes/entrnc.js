const express = require('express');
const router = express.Router();
const EntranceModel = require('../model/Entrance');

router.post('/', async (req, res) => {
    const { name, details, eligibility, syllabus, startdate, enddate, howtoapply, links } = req.body;

    // Check for missing fields
    if (!name || !details || !eligibility || !syllabus || !startdate || !enddate || !howtoapply || !links) {
        return res.status(400).json({ message: 'All required fields must be complete' });
    }

    try {
        // Check if the entrance with the same name already exists
        const existingEntrance = await EntranceModel.findOne({ name });
        if (existingEntrance) {
            return res.status(409).json({ message: 'Entrance with this name already exists' }); // HTTP 409 Conflict
        }

        // Create a new entrance if it doesn't exist
        const newEntrance = new EntranceModel({
            name,
            details,
            eligibility,
            syllabus,
            startdate,
            enddate,
            howtoapply,
            links
        });

        // Save to database
        await newEntrance.save();

        // Return success response
        res.status(201).json({
            message: 'Entrance created successfully',
            entrance: newEntrance
        });
    } catch (error) {
        console.error('Error creating entrance:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
