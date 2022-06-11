const router = require('express');
const { registerFarmer, loginFarmer, getFarmer } = require('./controllers/Farmer-controller.js');
const authRouter = Router();

authRouter.post('/signup', registerFarmer);
authRouter.post('/signin', loginFarmer);
authRouter.get('/myinfo', getFarmer);

module.exports = authRouter;