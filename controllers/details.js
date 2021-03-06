const express = require('express');
const Product = require('../models/Product-schema.js');
const Farmer = require('../models/Farmer-schema.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');
const mongoose = require('mongoose');


const getAllProducts = asyncHandler(async (req, res, next) => {
    const posts = await Product.find().populate('farmer');
    res.json(posts);
});

const getAllProductsByFarmerId = asyncHandler(async (req, res, next) => {
    // const posts = await Product.find().populate('farmer');
    // res.json(posts);
    //  //console.log(req);
    // const id = mongoose.Types.ObjectId.fromString(req.params.id);
    const id = req.params.id;
    ////console.log(id);
    let farmerProducts = await Product.find({ 'farmer': id });
    // farmerProducts = await farmerProducts.populate('farmer'); // To get the farmer details also ,please add farmer object in Productschema
    //console.log(farmerProducts);
    if (farmerProducts.length === 0) { throw new ErrorResponse('No products found', 403); }
    res.json({ farmerProducts: farmerProducts });

});


const createProduct = asyncHandler(async (req, res, next) => {
    const { body, file, farmerId } = req;
    const tempProductName = body.ProductName;
    // //console.log(req);
    const found = await Product.findOne({ 'ProductName': tempProductName, 'farmer': farmerId });
    ////console.log(found);
    if (found) { throw new ErrorResponse('ProductName already exists', 403); }
    let newProduct = await Product.create({ ...body, Image: { publicUrl: file.publicUrl }, farmer: farmerId });
    newProduct = await newProduct.populate('farmer');
    //console.log('New Added Product =', newProduct);
    res.status(201).json(newProduct);
});

const getSingleProduct = asyncHandler(async (req, res, next) => {
    // const { id } = req.params.id;
    const product = await Product.findById(req.params.id).populate('farmer');
    if (!product) throw new ErrorResponse(`product with id of ${req.params.id} doesn't exist`, 404);
    res.json(product);
});

const updateProduct = asyncHandler(async (req, res, next) => {
    //console.log(req.body);
    const found = await product.findById(req.params.id);
    //console.log(found);
    if (!found) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
    const updatedProduct = await (
        await Product.findOneAndUpdate(req.params.id, req.body, { new: true }));
    res.json(updatedProduct);
});


const deleteProduct = asyncHandler(async (req, res, next) => {

    const found = await Product.findById(req.params.id);
    //console.log(found);
    if (!found) throw new ErrorResponse(`Product with id of ${req.params.id} doesn't exist`, 404);
    const deleteddPost = await (
        await Product.findByIdAndDelete(req.params.id));
    res.json({ success: `Post with id of ${req.params.id} was deleted` });
});



module.exports = { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct, getAllProductsByFarmerId };