const express = require('express');

const Customer = require('../models/Customer');

const router = express.Router();

/**
 * Create new customer.
 * 
 * @name POST /api/customer
 */
router.post('/', [], async (req, res) => {
  if(req.body.username.length !== 0 && req.body.password.length !== 0){        
    try{
        let customer = await Customer.addOne(req.body.username, req.body.password);
        res.status(200).json({customer, message:"Customer account created."}).end();
    } catch(err){
      res.status(409).json({error: `${req.body.username} has already been registered. Please register only once.`}).end();
    }
  } else{
    res.status(400).json({error: `Please enter username and password`}).end();
  }
});

/**
 * Sign in to customer account.
 * 
 * @name POST /api/customer/signin
 */
router.post('/signin', [], async (req, res) => { 
  if(req.body.username.length !== 0 && req.body.password.length !== 0){
    if(req.session.username!==undefined){
      console.log(req.session.username);
      res.status(400).json({error: `You are already signed in as ${req.session.username}.`}).end();
    }else{
      const match = await Customer.checkAuthentication(req.body.username, req.body.password);
      if(match){
        req.session.username=req.body.username;
        res.status(200).json({name: req.body.username,message:"Customer sign-in successful."}).end();
      }else{
        res.status(400).json({error: `Credentials incorrect`}).end();
      }
    }
  }else{
    res.status(400).json({ error: 'Please enter username and password'}).end();
  }     
      
});

/** 
 * Sign out of customer account.
 * @name POST /api/customer/signout 
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

router.put('/username', [], async (req, res) => {
  if(req.body.username.length !== 0){        
    try{
        await Customer.changeUsername(req.session.username, req.body.username);
        req.session.username = req.body.username;
        res.status(200).json({name: req.body.username, message:"Username updated."}).end();
    } catch(err){
      res.status(409).json({error: `${req.body.username} has already been registered. Please register only once.`}).end();
    }
  } else{
    res.status(400).json({error: `Username cannot be empty.`}).end();
  }
});

router.put('/password', [], async (req, res) =>{
  if(req.body.password.length !== 0){        
    try{
        await Customer.changePassword(req.session.username, req.body.password);
        res.status(200).json({message:"Password updated."}).end();
    } catch(err){
      res.status(400).json({error: err}).end();
    }
  } else{
    res.status(400).json({error: `Password cannot be empty.`}).end();
  }
})

module.exports = router;
