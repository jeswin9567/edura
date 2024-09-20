const mongoose = require('mongoose')
const StudentLoanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true,
        minlenght: 10
    },

    amount: {
        type: Number,
        required: true
    },

    interest: {
        type: Number,
        required: true
    },

    repayment: {
        type: String,
        required: true
    },

    document: {
        type: String,
    },


})

const StudentLoanModel = mongoose.model("loan", StudentLoanSchema);
module.exports=StudentLoanModel;