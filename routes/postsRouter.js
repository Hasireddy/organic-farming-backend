const Router = require('express');
// const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken.js');
const validateJOI = require('../middlewares/validateJOI.js');
const { getAllPosts } = require('../controllers/posts.js');

const postsRouter = Router();

postsRouter.route('/').get(getAllPosts)


module.exports = postsRouter;
