const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const userRoutes = require("./routes/userRoutes");
const newsRoutes = require("./routes/newsRoutes");
const noticesRoutes = require("./routes/noticesRoutes");
const servicesRoutes = require("./routes/servicesRoutes");
const app = express();
const router = express.Router();

app.use(logger("short"));
app.use(cors());
app.use(express.json());

app.use(logger('short'))
app.use(cors())
app.use(express.json())
app.use(express.static("public"))


app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/services', servicesRoutes);
// router.use('/api-docs', swaggerUi.serve);
// router.get('/api-docs', swaggerUi.setup(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// todo - temporary solution to errors
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error " } = err;
  res.status(500).json({ message: err.message })
})

module.exports = app;
