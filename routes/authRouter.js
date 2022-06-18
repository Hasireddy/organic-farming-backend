const Router = require('express');
const { registerFarmer, loginFarmer, getFarmer } = require('../controllers/auth.js');

const authRouter = Router();

authRouter.post('/signup', registerFarmer);
authRouter.post('/signin', loginFarmer);
authRouter.get('/me', getFarmer);

module.exports = authRouter;
