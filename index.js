const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Import routes
const authRoute = require('./routes/auth');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Database Connection Successful!'))
.catch(err => console.error(err));

// Middlewares
app.use(express.json());

// Route middleware
app.use('/api/user', authRoute);

app.listen(3000, () => {
    console.log('Server is up and running...')
});