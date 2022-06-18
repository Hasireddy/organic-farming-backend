const ErrorResponse = require('../utils/ErrorResponse.js');

const validateJOI = schema => (req, res, next) => {
    const { error } = schema.validate(req.body);
    return error ? next(new ErrorResponse(error, 400)) : next();
};

module.exports = validateJOI;

//npm i joi