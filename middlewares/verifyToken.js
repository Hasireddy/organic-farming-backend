const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer-schema.js');

const verifyToken = asyncHandler(async (req, res, next) => {
    const { headers: { authorization } } = req;
    // console.log(authorization);
    if (!authorization) throw new ErrorResponse('Please login', 401);
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET); //if Token exists verify payload
    const farmer = await Farmer.findById(_id);
    if (!farmer) throw new ErrorResponse('Please login', 401);

    req.farmerId = _id;
    console.log("verify tocken");
    console.log(req.farmerId);
    next();
});

module.exports = verifyToken;