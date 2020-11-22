const express = require('express');

const Business = require('../models/Business');

const router = express.Router();

/**
 * Create new business.
 * 
 * @name POST /api/business
 */
router.post('/', [], async (req, res) => {        
    try{
        let business = await Business.addOne(req.body.username, req.body.password, req.body.businessName, req.body.address);
        res.status(200).json({business, message:"Business account created."}).end();
    } catch(err){
        res.status(400).json({error: err});
        //res.status(400).json({error: `${name} has already been registered. Please register only once.`}).end();
    }
});

module.exports = router;
