const Router = require("express");
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
const verifyToken = require("../middlewares/verifyToken.js");
const validateJOI = require("../middlewares/validateJOI.js");
const { productSchema } = require("../joi/schema.js");
const {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
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

module.exports = productsRouter;
