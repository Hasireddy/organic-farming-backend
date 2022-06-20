const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()
require('colors')

const authRouter = require('./routes/authRouter.js');
const postsRouter = require('./routes/postsRouter.js');

const errorHandler = require('./middlewares/errorHandler.js');

const connectDB = require('./dbconnect.js')
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }));

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

app.use('*', (req, res) => res.sendStatus(404));
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})