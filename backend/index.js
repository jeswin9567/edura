const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const loginRoute = require('./routes/log');
const signupRoute = require('./routes/sign');
const ScholarshipRoute = require('./routes/schship');
const StudentloanRoute = require('./routes/studln');
const EntraceRoute = require('./routes/entrnc');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/Project');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with a failure code
  }
};

connectDB();

// Use the login and signup routes
app.use('/log', loginRoute);
app.use('/sign', signupRoute);
app.use('/schship',ScholarshipRoute);
app.use('/studln',StudentloanRoute);
app.use('/entrnc',EntraceRoute);

// Server listen
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
