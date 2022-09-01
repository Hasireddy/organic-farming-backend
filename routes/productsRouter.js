const Router = require("express");
const multer = require('multer');
const FirebaseStorage = require('multer-firebase-storage');



const storage = FirebaseStorage({
    bucketName: process.env.FIREBASE_BUCKETNAME,
    credentials: {
        clientEmail: process.env.FIREBASE_CLIENTEMAIL,
        privateKey: process.env.FIREBASE_PRIVATEKEY.replace(/\\n/g, "\n"),
        projectId: process.env.FIREBASE_PROJECTID
    },
    public: true,
    unique: true

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
            // //console.log("body", req.farmerId, req.file);

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