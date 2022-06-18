// import Joi from 'joi'; //https://joi.dev/api/?v=17.6.0

// export const farmerSchema = Joi.object({
//     firstName: Joi.string().required(),
//     lastName: Joi.string().required(),
//     email: Joi.string().required(),
//     password: Joi.alphanum()
//         .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
//     address: Joi.string().required(),
//     certificationNum: Joi.string().required(),
//     postcode: Joi.string().required()

// });

// export const siginSchema = Joi.object({
//   email: Joi.string().required(),
//   password: Joi.string().alphanum().min(8).max(12).required()
// });

// export const postSchema = Joi.object({
//   title: Joi.string().required(),
//   image: Joi.string().required(),
//   body: Joi.string().required()
// });