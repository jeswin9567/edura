const express = require('express');
const router = express.Router();
const StudentLoanModel = require('../model/StudentLoan');

// Get all Details

router.get('/', async (req, res) => {
    try {
        const Loans = await StudentLoanModel.find();
        res.json(Loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

// Get by Id

router.get('/:id', async (req, res) => {
    try {
        const Loans = await StudentLoanModel.findById(req.params.id);
        if (!Loans) return res.status(404).json({ message: 'Loan not found' });
        res.json(Loans);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;