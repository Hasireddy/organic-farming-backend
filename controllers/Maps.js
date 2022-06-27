const express = require('express');
const router = express.Router();
const Maps = require('../models/Maps-schema.js');


const getLocations = async (req, res, next) => {
    try {
        const maps = await Maps.find();
        return res.status(200).json({
            success: true,
            count: maps.length,
            data: maps
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

const addLocations = async (req, res, next) => {
    try {
        console.log(req.body);
        const maps = await Maps.create(req.body);
        return res.status(200).json({
            success: true,
            data: maps
        });

    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { getLocations, addLocations };