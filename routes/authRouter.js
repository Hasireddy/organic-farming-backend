const Router = require('express');
const { registerFarmer, loginFarmer, getFarmer, productDetails, getProductsByFarmerId, deleteProductByFIdPId, updateProductByFIdPId, getSingleProductByFIdPId } = require('../controllers/auth.js');
const validateJOI = require('../middlewares/validateJOI.js');
const verifyToken = require('../middlewares/verifyToken.js');
const { farmerSchema, signinSchema, productSchema } = require('../joi/schema.js');
const authRouter = Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

authRouter.post('/register', validateJOI(farmerSchema), registerFarmer);
authRouter.post('/login', validateJOI(signinSchema), loginFarmer);
authRouter.get('/me', verifyToken, getFarmer);
authRouter.get('/getProductsByFarmerId/', verifyToken, getProductsByFarmerId);

authRouter.delete('/deleteProductByFIdPId/:id', verifyToken, deleteProductByFIdPId);
authRouter.get('/getSingleProductByFIdPId/:id', verifyToken, getSingleProductByFIdPId);
authRouter.put('/updateProductByFIdPId/:id', verifyToken, upload.single("Image"),
    (req, res, next) => {
        //console.log("req.file.path");
        //console.log(req);
        //console(req.file.path);
        Image: req.file.path;
        if (!req.file) next(new Error("Please upload an image"));
        next();
    },
    validateJOI(productSchema), updateProductByFIdPId);

module.exports = authRouter;
