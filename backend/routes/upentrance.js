const express = require('express');
const router = express.Router();
const EntranceModel = require('../model/Entrance') // Make sure to use the correct path for your model

// PUT route to update an entrance by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, details, education, degree, marksGeneral, marksBackward, syllabus, howtoapply, links, startdate, enddate } = req.body;

    try {
        // Find the entrance by ID and update it
        const updatedEntrance = await EntranceModel.findByIdAndUpdate(
            id,
            { 
                name, 
                details, 
                education,
                degree,
                marksGeneral,
                marksBackward,
                syllabus, 
                howtoapply, 
                links, 
                startdate, 
                enddate 
            },
            { new: true, runValidators: true } // Return the updated document
        );

        // Check if the entrance was found and updated
        if (!updatedEntrance) {
            return res.status(404).json({ message: 'Entrance not found' });
        }

        // Return the updated entrance
        res.status(200).json(updatedEntrance);
    } catch (error) {
        console.error('Error updating entrance:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
