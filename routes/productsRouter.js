const Router = require("express");
const multer = require('multer');
// const FirebaseStorage = require('multer-firebase-storage');

// const multer = Multer({
//     storage: FirebaseStorage({
//         bucketName: 'organic-farming-589f2.appspot.com',
//         credentials: {
//             clientEmail: 'malikireddy.uma@gmail.com',
//             privateKey: 'AIzaSyDWCvWVWQ0I_EiSEBlrWyjcsxpwdScimco',
//             projectId: 'organic-farming-589f2'
//         }
//     })
// })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });
const verifyToken = require("../middlewares/verifyToken.js");
const validateJOI = require("../middlewares/validateJOI.js");
const { productSchema } = require("../joi/schema.js");
const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    getAllProductsByFarmerId

} = require("../controllers/details.js");

const productsRouter = Router();

productsRouter
    .route("/")
    .get(getAllProducts)
    .post(
        verifyToken,
        upload.single("Image"),
        (req, res, next) => {
            // console.log("body", req.farmerId, req.file);
            Image: req.file.path;
            if (!req.file) next(new Error("Please upload an image"));
            next();
        },
        validateJOI(productSchema),
        createProduct
    );

productsRouter
    .route("/:id")
    .get(getSingleProduct)
    .put(verifyToken, updateProduct)
    .delete(verifyToken, deleteProduct);

productsRouter.get('/getAllProductsByFarmerId/:id', getAllProductsByFarmerId);



module.exports = productsRouter;