const express = require('express');
const convertGeo = require('../models/GeoCoder.js');
const router = express.Router();

router.get('/',(req,res)=>{
    // const business=req.body.busi;
    const address=convertGeo(req.query.address);
    address.then(addr=>{
        const latitude=addr[0].latitude;
        const longitude=addr[0].longitude;
        // const busiInfo=business;
        // busiInfo['latitude']=latitude;
        // busiInfo['longitude']=longitude;
        res.status(200).send({latitude,longitude}).end();
    });
});
module.exports = router;
