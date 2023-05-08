const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true });

app.get('/', async (req, res) => {
  try {
    const prefixName = req.query.name || '';
    const regex = new RegExp(`^${prefixName}`, 'i');
    const count = await User.countDocuments({ name: regex });
    res.json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


module.exports = app;
