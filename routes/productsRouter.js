const Router = require('express');
// const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken.js');
const validateJOI = require('../middlewares/validateJOI.js');
const { productSchema } = require('../joi/schema.js');
const { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/details.js');

const productsRouter = Router();

productsRouter.route('/').get(getAllProducts).post(verifyToken, validateJOI(productSchema), createProduct);

productsRouter.route('/:id').get(getSingleProduct).put(verifyToken, updateProduct).delete(verifyToken, deleteProduct);


module.exports = productsRouter;
