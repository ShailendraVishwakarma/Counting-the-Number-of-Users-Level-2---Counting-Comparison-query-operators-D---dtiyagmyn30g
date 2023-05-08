const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true });

app.get('/', async (req, res) => {
  try {
    const namePrefix = req.query.name || '';
    const count = await User.countDocuments({ name: { $regex: `^${namePrefix}`, $options: 'i' } });
    res.send({ count });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});


module.exports = app;
