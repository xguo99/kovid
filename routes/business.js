const express = require('express');

const Business = require('../models/Business');

const router = express.Router();

/**
 * Create new business.
 * 
 * @name POST /api/business
 */
router.post('/', [], async (req, res) => {
  const name = req.body.username;         
    try{
        let business = await Business.addOne(name, req.body.password, req.body.address);
        res.status(200).json({business, message:"Business account created."}).end();
    } catch(err){
        res.status(409).json({error: `${name} has already been registered. Please register only once.`}).end();
    }
});

/**
 * Sign in to business account.
 * 
 * @name POST /api/business/signin
 */
router.post('/signin', [], async (req, res) => { 
  if(req.body.username.length !== 0 && req.body.password.length !== 0 && req.body.address.length !== 0){
    // if(req.session.username!==undefined){
    //   res.status(400).json({error: `You are already signed in as ${req.session.username}.`}).end();
    // }
    let business = await Business.signIn(req.body.username, req.body.password, req.body.address);
    if(business !== null){
      req.session.username=req.body.username;
      res.status(200).json({name:req.body.username, business, message:"Business account created."}).end();
    }else{
      res.status(400).json({error: `Credentials incorrect`}).end();
    }
  }else{
    res.status(400).json({ error: 'Please enter username and password'}).end();
  }     
      
});

module.exports = router;
