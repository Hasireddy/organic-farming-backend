const express = require('express');
const Farmer = require('../models/Farmer-schema.js');
const Product = require('../models/Product-schema.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');

//this for controller is for Maps to get Farmers details along with their products for searching, setting search items
const getAllFarmerswithsearchproducts = asyncHandler(async (req, res, next) => {
    const farmers = await Farmer.find();
    var farmersarraywithsearchtext = [];

    for await (const farmer of farmers) {
        farmer["searchitem"] = await getproductssearchtext(farmer._id);
        farmersarraywithsearchtext.push(farmer);
    };
    // console.log('====================================');
    // console.log(farmersarraywithsearchtext);
    // console.log('====================================');
    res.json(farmersarraywithsearchtext);
});

const getproductssearchtext = asyncHandler(async (farmid) => {
    let farmerProducts = await Product.find({ 'farmer': farmid });
    let searchitem = '';
    farmerProducts.forEach(product => {
        //  console.log(product.ProductName + ' ' + product.Category);
        searchitem += (product.ProductName + ' ' + product.Category);
    });
    // console.log('====================================');
    // console.log(farmName);
    // console.log(searchitem);
    // console.log('====================================');
    return searchitem;

});

// const createPost = asyncHandler(async (req, res, next) => {
//     const { body } = req;
//     const newFarmer = await (await Farmer.create({ ...body }));
//     res.status(201).json(newFarmer);
// });

// const getSinglePost = asyncHandler(async (req, res, next) => {
//     // const { id } = req.params.id;
//     const farmer = await Farmer.findById(req.params.id);
//     if (!farmer) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
//     res.json(farmer);
// });

// const updatePost = asyncHandler(async (req, res, next) => {

//     const found = await Farmer.findById(req.params.id);
//     console.log(found);
//     if (!found) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
//     const updatedPost = await (
//         await Farmer.findOneAndUpdate(req.params.id, req.body, { new: true }));
//     res.json(updatedPost);
// });


// const deletePost = asyncHandler(async (req, res, next) => {

//     const found = await Farmer.findById(req.params.id);
//     console.log(found);
//     if (!found) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
//     const deleteddPost = await (
//         await Farmer.findByIdAndDelete(req.params.id));
//     res.json({ success: `Post with id of ${req.params.id} was deleted` });
// });



module.exports = { getAllFarmerswithsearchproducts };