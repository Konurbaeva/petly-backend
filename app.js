const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const app = express()

app.use(logger('short'))
app.use(cors())
app.use(express.json())

// TODO replace with the actual SECRET_KEY
const SECRET_KEY = '';


app.use('/api/users', userRoutes);

// todo - temporary solution to errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

app.use((req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
});

module.exports = app
