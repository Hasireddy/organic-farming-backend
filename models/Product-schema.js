const mongoose = require('mongoose');

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

        farmerId:
        {
            type: String,
            required: [false, 'FarmerId is required'],
        }
    });

module.exports = mongoose.model("Product", productSchema);