const mongoose = require('mongoose');
const { Schema, model, ObjectId } = mongoose;

const productSchema = new mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: [true, 'ProductName is required'],
            minlength: 4,
            maxlength: 255
        },
        Description: {
            type: String,
            required: [true, 'Description is required'],
            minlength: 10,
            maxlength: 255
        },
        Price: {
            type: Number,
            required: [true, 'Price is required'],

        },

        Category: {
            type: String,
            required: [true, 'Category is required'],
            minlength: 5,
            maxlength: 255
        },

        Image:
        {
            type: Object,
            required: [true, 'Image is required']
        },

        farmer:
        {
            type: ObjectId,
            ref: 'Farmer',
            required: [false, 'Farmer is required'],
        }

    });

module.exports = mongoose.model("Product", productSchema);