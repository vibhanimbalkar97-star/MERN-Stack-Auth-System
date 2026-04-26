const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db.js')
const app = express()
const PORT = process.env.PORT || 5000

// db connection
connectDB()


app.listen(PORT, (req, res) => {
    console.log(`Port started at ${PORT}`)
})