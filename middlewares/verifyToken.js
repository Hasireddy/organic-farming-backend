const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');
const jwt = require('jsonwebtoken');

const verifyToken = asyncHandler(async (req, res, next) => {
    const { headers: { authorization } } = req;
    // console.log(authorization);
    if (!authorization) throw new ErrorResponse('Please login', 401);
    const { _id } = jwt.verify(authorization, process.env.JWT_SECRET); //if Token exists verify payload
    req.farmerId = _id;
    next();
});

module.exports = verifyToken;