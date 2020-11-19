const NodeGeocoder = require('node-geocoder');
 
const options = {
 provider: 'google',
 // Optional depending on the providers
 apiKey: 'AIzaSyBZ3VO2vyG3LdrHKluJxoE5jrIsykpZOtM', // for Mapquest, OpenCage, Google Premier
 formatter: null // 'gpx', 'string', ...
};

const geocoder = NodeGeocoder(options);

async function convert(){
    let res = await geocoder.geocode({
        address: '222 Broadway Cambridge',
        city:'Cambridge',
        country: 'United States',
      });
    /*eslint-disable no-console */
    console.log(res);
    /*eslint-enable no-console */
    return res;}
//convert();
module.exports=geocoder;