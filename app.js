const express = require('express')
const logger = require('morgan')
const cors = require('cors')
require("dotenv").config()

const userRoutes = require('./routes/userRoutes');
const jwt = require('jsonwebtoken');
const app = express()

const { getNotifications } = require("../../controllers");

app.use(logger('short'))
app.use(cors())
app.use(express.json())

const { SECRET_KEY } = process.env

app.use('/api/users', userRoutes);

// todo - temporary solution to errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  const {status = 500, message = "Server error"} = err;
  res.status(status).json({ message })
})

module.exports = app
