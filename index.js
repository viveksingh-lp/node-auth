const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT, {useNewUrlParser: true}, () => {
    console.log('Connected to DB')
});

// Import routes
const authRoute = require('./routes/auth');

// Route middleware
app.use('/api/user', authRoute);

app.listen(3000, () => {
    console.log('Server is up and running...')
});