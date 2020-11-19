const NodeGeocoder = require('node-geocoder');
 
const options = {
 provider: 'google',
 // Optional depending on the providers
 apiKey: 'AIzaSyBZ3VO2vyG3LdrHKluJxoE5jrIsykpZOtM', // for Mapquest, OpenCage, Google Premier
 formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

async function convert(addr){
    let res = await geocoder.geocode({
        address: addr+'Cambridge',
        city:'Cambridge',
        country: 'United States',
      });
    return res;}
module.exports=convert;
