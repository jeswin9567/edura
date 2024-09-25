const express = require('express');
const router = express.Router();
const EntranceModel = require('../model/Entrance');

// DELETE route to remove an entrance by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the entrance by ID and delete it
        const entrance = await EntranceModel.findByIdAndDelete(id);

        // Check if the entrance was found and deleted
        if (!entrance) {
            return res.status(404).json({ message: 'Entrance not found' }); // HTTP 404 Not Found
        }

        // Return success response
        res.status(200).json({ message: 'Entrance deleted successfully' });
    } catch (error) {
        console.error('Error deleting entrance:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
