const express = require('express')
const logger = require('morgan')
const cors = require('cors')

require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');

const app = express()

app.use(logger('short'))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))


app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

// todo - temporary solution to errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;
  res.status(500).json({ message: err.message })
})

module.exports = app
