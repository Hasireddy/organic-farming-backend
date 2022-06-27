const nodeGeocoder = require('node-geocoder');
const varevn = require('dotenv').config()
const options = {

    provider: process.env.GEOCODER_PROVIDER,//'mapquest',// varevn.GEOCODER_PROVIDER, //require('dotenv').config(),
    httpAdapter: 'https',
    apiKey: process.env.GEOCODER_API_KEY,//'taxwQc8TEGs8QwBs3NGECPdz15xvsba2', //process.env.GEOCODER_API_KEY,
    formatter: null
};
// console.log("logging options");
// console.log(options);
// console.log(process.env.GEOCODER_API_KEY);
const geocoder = nodeGeocoder(options);

module.exports = geocoder;