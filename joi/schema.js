const Joi = require('joi'); //https://joi.dev/api/?v=17.6.0

const farmerSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().alphanum().min(6).max(12).required(),
    address: Joi.string().required(),
    certificationNum: Joi.number().required(),
    postcode: Joi.number().required()

});


const signinSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().alphanum().min(6).max(12).required()
});


module.exports = { farmerSchema, signinSchema };