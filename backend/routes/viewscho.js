const express = require('express');
const router = express.Router();
const ScholarShipModel = require('../model/scholarship');

// GET all scholarships
router.get('/', async (req, res) => {
    try {
        const scholarships = await ScholarShipModel.find();
        res.json(scholarships);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific scholarship by ID
router.get('/:id', async (req, res) => {
    try {
        const scholarship = await ScholarShipModel.findById(req.params.id);
        if (!scholarship) return res.status(404).json({ message: 'Scholarship not found' });
        res.json(scholarship);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
