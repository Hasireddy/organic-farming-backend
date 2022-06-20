const express = require('express');
const Product = require('../models/Product-schema.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');


const getAllProducts = asyncHandler(async (req, res, next) => {
    const posts = await Product.find();
    res.json(posts);
});


const createProduct = asyncHandler(async (req, res, next) => {
    const { body } = req;
    const newProduct = await (await Product.create({ ...body }));
    res.status(201).json(newProduct);
});

const getSingleProduct = asyncHandler(async (req, res, next) => {
    // const { id } = req.params.id;
    const product = await Product.findById(req.params.id);
    if (!product) throw new ErrorResponse(`product with id of ${req.params.id} doesn't exist`, 404);
    res.json(product);
});

const updateProduct = asyncHandler(async (req, res, next) => {

    const found = await product.findById(req.params.id);
    console.log(found);
    if (!found) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
    const updatedProduct = await (
        await Product.findOneAndUpdate(req.params.id, req.body, { new: true }));
    res.json(updatedProduct);
});


const deleteProduct = asyncHandler(async (req, res, next) => {

    const found = await Product.findById(req.params.id);
    console.log(found);
    if (!found) throw new ErrorResponse(`Product with id of ${req.params.id} doesn't exist`, 404);
    const deleteddPost = await (
        await Product.findByIdAndDelete(req.params.id));
    res.json({ success: `Post with id of ${req.params.id} was deleted` });
});



module.exports = { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct };