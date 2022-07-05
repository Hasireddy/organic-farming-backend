const mongoose = require('mongoose');
const { Schema, model, ObjectId } = mongoose;

const FarmerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'FirstName is required'],
        minlength: 2,
        maxlength: 255
    },
    lastname: {
        type: String,
        required: [true, 'LastName is required'],
        minlength: 2,
        maxlength: 255
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please use a valid email"] //regex for email
    },

    password: {
        type: String,
        required: [true, 'Password is required'], select: false,
        minlength: 6
    },

    farmName: {
        type: String,
        required: [true, 'FarmName is is required']
    },

    address: {
        type: String,
        required: [true, 'Address is required']
    },

    postcode: {
        type: Number,
        required: [true, 'Postal code is required']

    },
    countrycode: {
        type: String,
        required: [true, 'Country code is required'],
        minlength: 2,
        maxlength: 2
    },
    location: {
        type: {
            type: String,
            enum: ['Point']
        },
        coordinates: {
            type: [Number],
            index: '2dsphere'
        },
        formattedAddress: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    searchitem: {
        type: String,
        required: [false, 'searchitem is required']
    }

});

module.exports = mongoose.model("Farmer", FarmerSchema);