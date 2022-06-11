const Farmer = require('../models/Farmer-details.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');

const registerFarmer = asyncHandler(async(req, res, next) => {
    const farmers = await post.find();
    res.json({ success: "user registered" });
});

const loginFarmer = asyncHandler(async(req, res, next) => {
    const farmers = await post.find();
    res.json({ success: "user registered" });
});

const getFarmer = asyncHandler(async(req, res, next) => {
    const farmers = await post.find();
    res.json({ success: "user registered" });
});



module.exports = { registerFarmer, loginFarmer, getFarmer }