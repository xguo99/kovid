const express = require('express');

const Business = require('../models/Business');

const router = express.Router();

/**
 * Create new business.
 * 
 * @name POST /api/business
 */
router.post('/', [], async (req, res) => {   
  if (req.body.username.length > 0 && req.body.password.length > 0){     
    try{
        let business = await Business.addOne(req.body.username, req.body.password, req.body.businessName, req.body.address, req.body.status, req.body.modification);
        res.status(200).json({business, message:"Business account created."}).end();
    } catch(err){
      res.status(409).json({error: `${req.body.username} has already been registered. Please register only once.`}).end();
    }
  } else{
    res.status(400).json({ error: 'Please enter username and password'}).end();
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
      //console.log(req.session.username);
      res.status(400).json({error: `You are already signed in as ${req.session.username}.`}).end();
    }else{
      let business = await Business.getOne(req.body.username, req.body.password);
      let busiName = await Business.getBusiName(req.body.username, req.body.password);
      let busiAddress= await Business.getBusiAddress(req.body.username, req.body.password);
      if(business !== null){
        req.session.username=req.body.username;
        //console.log(busiName);
        //console.log(busiAddress);
        res.status(200).json({name:req.body.username, business,bName:busiName, bAdd: busiAddress,message:"Sign in successful."}).end();
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

/**
 * Get Description
 * @name POST /api/business/description
 */
router.post('/description',[],async (req,res)=>{
  try{
  let description = await Business.getBusiDescription(req.body.name, req.body.address);
  res.status(200).json({data:description, message: 'Get description'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Description
 * @name PUT /api/business/description
 */

 router.put('/description',[],async (req,res)=>{
    let business = await Business.addBusiDescription(req.body.name, req.body.address, req.body.content);
    res.status(200).json({business, message:"Description Updated"}).end();
 })

 /**
 * Get Category
 * @name POST /api/business/category
 */
router.post('/category',[],async (req,res)=>{
  try{
  let category = await Business.getBusiCategory(req.body.name, req.body.address);
  res.status(200).json({data:category, message: 'Get category'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Category
 * @name PUT /api/business/category
 */

 router.put('/category',[],async (req,res)=>{
    let business = await Business.addBusiCategory(req.body.name, req.body.address, req.body.content);
    res.status(200).json({business, message:"Category Updated"}).end();
 })

module.exports = router;
