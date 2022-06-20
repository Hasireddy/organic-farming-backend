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

const productSchema = Joi.object({
    ProductName: Joi.string().required(),
    Description: Joi.string().required(),
    Price: Joi.number().required(),
    Category: Joi.string().alphanum().min(6).max(12).required(),
    FarmAddress: Joi.string().required(),
    postcode: Joi.number().required()
    // Image: Joi.image().required()

})


module.exports = { farmerSchema, signinSchema, productSchema };