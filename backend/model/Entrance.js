const mongoose = require('mongoose');

const EntranceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    degree: [{
        type: String,
        required: false,
    }],
    marksGeneral: {
        type: String,
        required: true,
    },
    marksBackward: {
        type: String,
        required: true,
    },
    syllabus: {
        type: String,
        required: true,
    },
    startdate: {
        type: Date,
        required: true,
    },
    enddate: {
        type: Date,
        required: true,
    },
    howtoapply: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    state: {
        type:String,
        required: true,
    },
    examType: {
        type: String,
        required:true
    },
}, { timestamps: true });

module.exports = mongoose.model('Entrance', EntranceSchema);
