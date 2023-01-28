const jwt = require("jsonwebtoken")
const { RequestError } = require("../helpers")

const { User } = require("../models/userModel")

require("dotenv").config()

const { SECRET_KEY } = process.env
