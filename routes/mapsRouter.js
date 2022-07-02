const Router = require('express');
// const router = require('express').Router();
// const verifyToken = require('../middlewares/verifyToken.js');
// const validateJOI = require('../middlewares/validateJOI.js');
// const { farmerSchema } = require('../joi/schema.js');
const { getAllFarmerswithsearchproducts } = require('../controllers/maps.js');

const mapsRouter = Router();

mapsRouter.route('/').get(getAllFarmerswithsearchproducts);

module.exports = mapsRouter;

// postsRouter.route('/').get(getAllFarmerswithsearchproducts).post(verifyToken, validateJOI(farmerSchema), createPost);

// postsRouter.route('/:id').get(getSinglePost).put(verifyToken, updatePost).delete(verifyToken, deletePost);


// module.exports = postsRouter;


