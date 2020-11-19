const express = require('express');
const convertGeo = require('../models/GeoCoder.js');
const router = express.Router();


router.put('/search',(req,res)=>{
    const business=req.body.busi;
    const address=convertGeo(business.phone);
    address.then(addr=>{
        const latitude=addr[0].latitude;
        const longitude=addr[0].longitude;
        const busiInfo=business;
        busiInfo['latitude']=latitude;
        busiInfo['longitude']=longitude;
        res.status(200).json(busiInfo).end();
    });
});
module.exports = router;
