const express = require('express');
const Farmer = require('../models/Farmer-details.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');

const registerFarmer = asyncHandler(async (req, res, next) => {
    /*
    validate the input =>use a midddlewrae with joi
    check if farmer already exists=>farmer.find(by email)
    if exists say no=>throw ErrorResponse
    if not exists create
     Hash(and salt)the password
    create Token jsonWebToken https://www.npmjs.com/package/jsonwebtoken
    send Token => res.json() res.set() res.cookie()

    */
    res.json({ success: 'Farmer registered' });
});

const loginFarmer = asyncHandler(async (req, res, next) => {

    res.json({ success: "Farmer logged in" });
});

const getFarmer = asyncHandler(async (req, res, next) => {

    res.json({ success: "This is the Farmer" });
});


module.exports = { registerFarmer, loginFarmer, getFarmer };