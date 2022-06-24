const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
require('dotenv').config()
require('colors')


const authRouter = require('./routes/authRouter.js');
const postsRouter = require('./routes/postsRouter.js');
const productsRouter = require('./routes/productsRouter.js');

const errorHandler = require('./middlewares/errorHandler.js');

const connectDB = require('./dbconnect.js');
const { getEventListeners } = require('events');
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors({ origin: '*' }));
app.use('/uploads', express.static('uploads')); // It makes uploads Folder publicly appear http://localhost:5000/uploads/peppers-1-300x300.jpg to view image in Browser.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/details', productsRouter);

app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})