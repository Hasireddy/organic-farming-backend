const Router = require('express');
const { registerFarmer, loginFarmer, getFarmer, productDetails, getProductsByFarmerId, deleteProductByFIdPId } = require('../controllers/auth.js');
const validateJOI = require('../middlewares/validateJOI.js');
const verifyToken = require('../middlewares/verifyToken.js');
const { farmerSchema, signinSchema, productSchema } = require('../joi/schema.js');
const authRouter = Router();

authRouter.post('/signup', validateJOI(farmerSchema), registerFarmer);
authRouter.post('/signin', validateJOI(signinSchema), loginFarmer);
authRouter.get('/me', verifyToken, getFarmer);
authRouter.get('/getProductsByFarmerId', verifyToken, getProductsByFarmerId);
authRouter.delete('/deleteProductByFIdPId/:id', verifyToken, deleteProductByFIdPId);
module.exports = authRouter;
