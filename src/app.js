// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

// Create Express app
const app = express();

// Set up database connection using Mongoose
mongoose.connect('mongodb://localhost/social-media-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB!'))
.catch(err => console.error('Error connecting to MongoDB', err));

// Define app routes
app.get('/', async (req, res) => {
  try {
    const namePrefix = req.query.name || '';
    const regexPattern = new RegExp(`^${namePrefix}`, 'i'); // 'i' flag for case-insensitive match
    const usersCount = await User.countDocuments({ name: regexPattern });
    res.status(200).send({ count: usersCount });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server started on port 3000!');
});

module.exports = app;
