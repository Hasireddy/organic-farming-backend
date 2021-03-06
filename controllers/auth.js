const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Farmer = require('../models/Farmer-schema.js');
const Product = require('../models/Product-schema.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');
const verifyToken = require('../middlewares/verifyToken.js');
const geocoder = require('../utils/geocoder');

const registerFarmer = asyncHandler(async (req, res, next) => {
    /*
    validate the input =>use a midddlewrae with joi
    check if farmer already exists=>farmer.find(by email)
    if exists say no=>throw ErrorResponse
    if not exists create
     Hash(and salt)the password https://www.npmjs.com/package/bcrypt?activeTab=readme
     Create Farmer
    create Token jsonWebToken https://www.npmjs.com/package/jsonwebtoken
    send Token => res.json() res.set() res.cookie()
    */
    const { body: { email, password, ...rest } } = req;
    //console.log(req.body);
    const found = await Farmer.findOne({ email });
    // //console.log(farmer);
    if (found)
        throw new ErrorResponse('Farmer already exists', 403);
    const hash = await bcrypt.hash(password, 5);
    const fullAddress = req.body.address + ' ' + req.body.postcode + ' ' + req.body.countrycode;
    //console.log(fullAddress);
    //create farmer
    const loc = await geocoder.geocode(fullAddress);
    const location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
    }
    //console.log(location);
    const { _id } = await Farmer.create({ ...rest, email, password: hash, location: location });
    // const {_id} =  await Farmer.create({ ...rest, email, password: hash });
    const token = jwt.sign({ _id }, process.env.JWT_SECRET);
    //console.log(_id);
    res.json({ token });
    // //console.log(newFarmer);
    // res.json({ success: 'Farmer registered' });
});


const loginFarmer = asyncHandler(async (req, res, next) => {
    /*
   validate the input =>use a midddlewrae with joi
   check if farmer already exists=>farmer.find(by email)
   if not exists say no=>throw ErrorResponse
   if exists 
    verify the password [] https://www.npmjs.com/package/bcrypt?activeTab=readme
    if password not a match => throw ErrorResponse[]
    if password match
   create Token jsonWebToken https://www.npmjs.com/package/jsonwebtoken
   send Token => res.json() res.set() res.cookie()
   */
    const { body: { email, password } } = req;
    const found = await Farmer.findOne({ email }).select('+password'); //In farmer-details.js we have given password select as false.So we have to add explicitily here.By using this Mongoose prevents accidentally giving the Passsword.
    if (!found) throw new ErrorResponse(`Farmer doesn't exist`, 404);
    const match = await bcrypt.compare(password, found.password) //verifying password
    //console.log(match);
    if (!match) throw new ErrorResponse('Password is incorrect', 400); //Checking if password matches or not.
    const token = jwt.sign({ _id: found._id }, process.env.JWT_SECRET); // If password matches create & send token.
    res.json({ token });

    // res.json({ success: "Farmer logged in" }); 
});


const getFarmer = asyncHandler(async (req, res, next) => {
    const { farmerId } = req;
    const farmer = await Farmer.findById(farmerId);
    if (!farmer) throw new ErrorResponse(`Farmer doesn't exist`, 404);
    res.json(farmer);
    // res.json({ success: "This is the Farmer" });
});

const productDetails = asyncHandler(async (req, res, next) => {
    const { body: { ProductName, Description, ...rest } } = req;
    const found = await Product.findOne({ ProductName });
    if (found) { throw new ErrorResponse('ProductName already exists', 403); }
    const product = await Product.create({ ...rest, ProductName, Description });
    res.json({ product: product });
    //console.log(product);
});

const getProductsByFarmerId = asyncHandler(async (req, res, next) => {
    const { farmerId } = req;
    //console.log(farmerId);
    let farmerProducts = await Product.find({ 'farmer': farmerId });
    // farmerProducts = await farmerProducts.populate('farmer'); // To get the farmer details also ,please add farmer object in Productschema
    //console.log(farmerProducts);
    if (farmerProducts.length === 0) { throw new ErrorResponse('No products found', 403); }
    res.json({ farmerProducts: farmerProducts });


});

// Deleting product with Farmer Id & ProductId
const deleteProductByFIdPId = asyncHandler(async (req, res, next) => {
    const { farmerId } = req;
    const id = req.params.id
    //console.log(farmerId);
    const found = await Product.find({ '_id': id, 'farmer': farmerId });

    if (found.length === 0) {
        throw new ErrorResponse(`Product with id of ${id} doesn't exist`, 404);
    }
    const deleteddPost = await (
        await Product.findByIdAndDelete(id));
    // //console.log(deleteddPost);
    res.json({ success: `Product with id of ${id} was deleted` });
});


//  Updating product with Farmer Id & ProductId


const updateProductByFIdPId = asyncHandler(async (req, res, next) => {
    //console.log("req");
    const { farmerId } = req;
    const id = req.params.id
    //console.log("updates");
    //console.log("req.body");
    const updates = req.body;


    // //console.log(req);
    const options = { new: true }
    const found = await Product.find({ '_id': id, 'farmer': farmerId, });

    if (found.length === 0) {
        throw new ErrorResponse(`Product with id of ${id} doesn't exist`, 404);
    }
    else {
        const updatedPost = await (
            await Product.findByIdAndUpdate(id, updates, options));
        //console.log("updatedPost");
        //console.log(updatedPost);
        res.json(updatedPost);
        res.json({ success: `Product with id of ${id} was updated` });
    }
});


//getting single product by Farmer and product id

const getSingleProductByFIdPId = asyncHandler(async (req, res, next) => {
    const { farmerId } = req;
    const id = req.params.id
    const product = await Product.findById({ '_id': id, 'farmer': farmerId });
    if (!product) throw new ErrorResponse(`product with id of ${req.params.id} doesn't exist`, 404);
    res.json(product);
});


module.exports = { registerFarmer, loginFarmer, getFarmer, productDetails, getProductsByFarmerId, deleteProductByFIdPId, updateProductByFIdPId, getSingleProductByFIdPId };