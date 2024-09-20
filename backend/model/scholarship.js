    const mongoose = require('mongoose');
    const ScholarShipSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true, // Name is mandatory
            trim: true // Removes leading/trailing spaces
        },
        description: {
            type: String,
            required: true,
            minlength: 10 // Ensure description is not too short
        },
        award: {
            type: String,
            required: true
        },
        eligibility: {
            type: String,
            required: true
        },
        document: {
            type: String
        },
        startdate: {
            type: Date // Consider storing dates as actual Date objects
        },
        enddate: {
            type: Date
        },
        link: {
            type: String
        },
        howToApply: {
            type: String
        }
    });

    const ScholarShipModel = mongoose.model("Scholarship", ScholarShipSchema);
    module.exports = ScholarShipModel;
