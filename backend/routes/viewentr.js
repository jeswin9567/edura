const express = require('express');
const router = express.Router ();
const EntranceModel = require('../model/Entrance');

// Get all Details

router.get('/', async (req, res) => {
    try {
        const entrances = await EntranceModel.find();
        res.json(entrances);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Get by Id

router.get('/:id', async (req, res) => {
    try { 
        const entrance = await EntranceModel.findById(req.params.id);
        if(!entrance) return res.status(404).json({message: 'Entrance not found'});
        res.json(entrance);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;