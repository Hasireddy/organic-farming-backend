const express = require('express');
const Farmer = require('../models/Farmer-schema.js');
const asyncHandler = require('../utils/asyncHandler.js');
const ErrorResponse = require('../utils/ErrorResponse.js');


const getAllPosts = asyncHandler(async (req, res, next) => {
    const posts = await Farmer.find();
    res.json(posts);
});


const createPost = asyncHandler(async (req, res, next) => {
    const { body } = req;
    const newFarmer = await (await Farmer.create({ ...body }));
    res.status(201).json(newFarmer);
});

const getSinglePost = asyncHandler(async (req, res, next) => {
    // const { id } = req.params.id;
    const farmer = await Farmer.findById(req.params.id);
    if (!farmer) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
    res.json(farmer);
});

const updatePost = asyncHandler(async (req, res, next) => {

    const found = await Farmer.findById(req.params.id);
    console.log(found);
    if (!found) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
    const updatedPost = await (
        await Farmer.findOneAndUpdate(req.params.id, req.body, { new: true }));
    res.json(updatedPost);
});


const deletePost = asyncHandler(async (req, res, next) => {

    const found = await Farmer.findById(req.params.id);
    console.log(found);
    if (!found) throw new ErrorResponse(`farmer with id of ${req.params.id} doesn't exist`, 404);
    const deleteddPost = await (
        await Farmer.findByIdAndDelete(req.params.id));
    res.json({ success: `Post with id of ${req.params.id} was deleted` });
});



module.exports = { getAllPosts, createPost, getSinglePost, updatePost, deletePost };