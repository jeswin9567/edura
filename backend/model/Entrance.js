const mongoose = require('mongoose');

const EntranceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: true
    },
    syllabus: {
        type: String,
        required: true
    },
    startdate: {
        type: Date,
        required: true
    },
    enddate: {
        type: Date,
        required: true
    },
    
    howtoapply: {
        type: String,
        required: true
    },
    links: {
        type: String,
        required: true
    }
});

const EntranceModel = mongoose.model("Entrance", EntranceSchema);
module.exports = EntranceModel;
