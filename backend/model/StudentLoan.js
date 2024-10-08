const mongoose = require('mongoose');

const StudentLoanSchema = new mongoose.Schema({
    loanName: {
        type: String,
        required: true,
        trim: true
    },

    bankName: {
        type: String,
        required: true,
        trim: true
    },

    bankWebsite: {
        type: String,
        required: true,
        trim: true
    },

    contactNumber: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    loanType: {
        type: String,
        required: true,
        enum: ['domestic', 'international'], // Can be extended with more loan types
    },

    fieldOfStudy: {
        type: String,
        required: true
    },
    repayment: {
        type:String,
        required: true
    },

    minAmount: {
        type: Number,
        required: true
    },

    maxAmount: {
        type: Number,
        required: true
    },

    minInterestRate: {
        type: Number,
        required: true
    },

    maxInterestRate: {
        type: Number,
        required: true
    },

    collateral: {
        type: String,
        required: false // Optional field if collateral is required
    },

    applicationProcess: {
        type: String,
        required: true,
        minlength: 10
    },

    eligibilityCriteria: {
        type: String,
        required: false // Optional field for eligibility criteria
    }
});

const StudentLoanModel = mongoose.model("loan", StudentLoanSchema);
module.exports = StudentLoanModel;
