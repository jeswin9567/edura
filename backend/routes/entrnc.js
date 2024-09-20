const express = require('express');
const router = express.Router();
const EntranceModel = require('../model/Entrance');

router.post('/', async (req, res) => {
    const { name, details, eligibility, syllabus, startdate, enddate, howtoapply, links } = req.body;

    if (!name || !details || !eligibility || !syllabus || !startdate || !enddate || !howtoapply || !links)  {
        return res.status(400).json ({ message: 'All required fields must be complete'});
    }

    try {
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

        //save to database
        await newEntrance.save();

        //return success
        res.status(201).json({
            message: 'Entrance created successfully',
            entrance: newEntrance
        })
    }
    catch (error) {
        console.error('error creating scholarship:',error.message);
        res.status(500).json ({message: 'server error'});

    }
})

module.exports = router;