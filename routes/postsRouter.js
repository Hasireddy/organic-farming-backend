const Router = require('express');
// const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken.js');
const validateJOI = require('../middlewares/validateJOI.js');
const { farmerSchema } = require('../joi/schema.js');
const { getAllPosts, createPost, getSinglePost, updatePost, deletePost } = require('../controllers/posts.js');

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts).post(verifyToken, validateJOI(farmerSchema), createPost);

postsRouter.route('/:id').get(getSinglePost).put(verifyToken, updatePost).delete(verifyToken, deletePost);


module.exports = postsRouter;
