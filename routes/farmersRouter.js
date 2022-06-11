const express = require('express')

const farmersRouter = express.Router()

const { registerFarmer, loginFarmer, getFarmer } = require('../controllers/Farmer-controller.js')

// farmersRouter.route.post('/Register', registerFarmer);
// farmersRouter.route.post('/Login', loginFarmer);
// farmersRouter.route.post('/myinfo', getFarmer);

// token based authentiction system needs a key. so every time we need to generate a key. so both requests are Post requests.

// farmersRouter.route("/:id").get(getOneFarmer).put(updateFarmer).delete(deleteFarmer);

module.exports = farmersRouter;