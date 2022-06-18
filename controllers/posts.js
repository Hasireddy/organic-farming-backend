const express = require('express');
const Farmer = require('../models/Farmer-details.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');


const getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Farmer.find();
    res.json(posts);
});

module.exports = { getAllPosts };