const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const userRoutes = require('./routes/userRoutes');

const app = express()

app.use(logger('short'))
app.use(cors())
app.use(express.json())


app.use('/api/users', userRoutes);

// todo - temporary solution to errors
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
