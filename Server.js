const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config()
require('colors')

const errorHandler = require('./middlewares/errorHandler.js');

const connectDB = require('./dbconnect.js')
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})