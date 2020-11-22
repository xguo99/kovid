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
        res.status(409).json({error: `${req.body.username} has already been registered. Please register only once.`}).end();
    }
});

/**
 * Sign in to business account.
 * 
 * @name POST /api/business/signin
 */
router.post('/signin', [], async (req, res) => { 
  if(req.body.username.length !== 0 && req.body.password.length !== 0){
    if(req.session.username!==undefined){
      console.log(req.session.username);
      res.status(400).json({error: `You are already signed in as ${req.session.username}.`}).end();
    }else{
      let business = await Business.getOne(req.body.username, req.body.password);
      if(business !== null){
        req.session.username=req.body.username;
        
        res.status(200).json({name:req.body.username, business, message:"Business account created."}).end();
      }else{
        res.status(400).json({error: `Credentials incorrect`}).end();
      }
    }
  }else{
    res.status(400).json({ error: 'Please enter username and password'}).end();
  }     
      
});

/** 
 * Sign out of business account.
 * @name POST /api/business/signout 
 * @throws {400} if client is not already signed in
 */
router.post('/signout', [], async (req, res) => { 
  // if client is signed in
  if (req.session.username !== undefined) {
      req.session.username=undefined;
      res.status(200).json({message: 'Successfully signed out'});
  } else {
      res.status(400).json({error: 'You are currently not signed in'});
  }
});

module.exports = router;
