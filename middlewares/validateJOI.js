const ErrorResponse = require('../utils/ErrorResponse.js');

const validateJOI = schema => (req, res, next) => {
    //console.log("validation1");
    const { error } = schema.validate(req.body);
    //console.log(error);
    return error ? next(new ErrorResponse(error, 400)) : next();
};

module.exports = validateJOI;

//npm i joi