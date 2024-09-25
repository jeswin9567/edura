const express = require('express');
const router = express.Router();
const StudentLoanModel = require('../model/StudentLoan');

router.post ( '/', async (req, res) => {
    const {name, description, amount, interest, repayment, document} = req.body;

    if(!name || !description || !amount || !interest || !repayment || !document) {
        return res.status(400).json({message: 'Please fill in all fields.'});
    }

    try{

            // Check if a loan with the same name already exists
            const existingLoan = await StudentLoanModel.findOne({ name });
            if (existingLoan) {
                return res.status(409).json({ message: 'Student Loan with this name already exists' }); // HTTP 409 Conflict
            }   
        const newStudentLoan = new StudentLoanModel({
            name,
            description,
            amount,
            interest,
            repayment,
            document
    });

    await newStudentLoan.save();
    res.status(201).json({
        message:'Loan created successfully',
        loan: newStudentLoan
    });
}
catch(error)
{
    console.error('error',error.message);
    res.status(500).json({message: 'server error'});
}

});

module.exports = router;