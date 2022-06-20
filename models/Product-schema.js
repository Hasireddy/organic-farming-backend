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
        FarmAddress: {
            type: String,
            required: [true, 'Address is required'],
        },

        postcode: {
            type: Number,
            required: [true, 'Postal code is required']
        }
        // farmerId: {
        //     type: Number,
        //     required: [true, 'FarmerId code is required']
        // }

        // Image:
        // {
        //     type: Image,
        //     required: [true, 'Image is required']
        // }
    });

module.exports = mongoose.model("Product", productSchema);