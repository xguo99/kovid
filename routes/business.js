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
 * Get CovidInfo
 * @name POST /api/business/CovidInfo
 */
router.post('/CovidInfo',[],async (req,res)=>{
  try{
  let CovidInfo = await Business.getBusiCovidInfo(req.body.name, req.body.address);
  res.status(200).json({data: CovidInfo, message: 'Get CovidInfo'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update CovidInfo
 * @name PUT /api/business/CovidInfo
 */

router.put('/CovidInfo',[],async (req,res)=>{
  let business = await Business.addBusiCovidInfo(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"CovidInfo Updated"}).end();
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

 /**
  * Filter Category
  * @name POST /api/business/filter
  */

  router.post('/filter', [], async (req, res) => {
    console.log('filter here');
    try {
      let business = await Business.filterBusiCategory(req.body.content);
      res.status(200).json({business, message:"Category filtered"}).end();
    } catch (err) {
      console.log(err);
    }
 
  }
  )

  /**
   * Get all data
   * @name POST /api/business/all
   */

  router.post('/all', [], async (req, res) => {
    console.log('trying to get all data here');
    let allData = await Business.getAllData();
    console.log('data we got in db is ', allData);
    res.status(200).json({allData, message:"All data found"}).end();
  })

 /**
 * Get Mask
 * @name POST /api/business/mask
 */
router.post('/mask',[],async (req,res)=>{
  try{
  let mask = await Business.getBusiMask(req.body.name, req.body.address);
  res.status(200).json({data:mask, message: 'Get mask'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Mask
 * @name PUT /api/business/mask
 */

router.put('/mask',[],async (req,res)=>{
  let mask = await Business.addBusiMask(req.body.name, req.body.address, req.body.content);
  res.status(200).json({mask, message:"mask Updated"}).end();
})

/**
 * Get Hand Sanitizer
 * @name POST /api/business/handSanitizer
 */
router.post('/handSanitizer',[],async (req,res)=>{
  try{
  let handSanitizer = await Business.getBusiHandSanitizer(req.body.name, req.body.address);
  res.status(200).json({data:handSanitizer, message: 'Get hand sanitizer'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Hand Sanitizer
 * @name PUT /api/business/handSanitizer
 */

router.put('/handSanitizer',[],async (req,res)=>{
  let handSanitizer = await Business.addBusiHandSanitizer(req.body.name, req.body.address, req.body.content);
  res.status(200).json({handSanitizer, message:"hand sanitizer Updated"}).end();
})

 /**
 * Get Schedule
 * @name POST /api/business/schedule
 */
router.post('/schedule',[],async (req,res)=>{
  try{
  let monday = await Business.getBusiSchedule(req.body.name, req.body.address);
  res.status(200).json({data:monday, message: 'Get schedule'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

 /**
 * Update Monday
 * @name PUT /api/business/monday
 */

router.put('/monday',[],async (req,res)=>{
  let business = await Business.addBusiMonday(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"Monday Updated"}).end();
})

 /**
 * Update Tue
 * @name PUT /api/business/tuesday
 */

router.put('/tuesday',[],async (req,res)=>{
  let business = await Business.addBusiTuesday(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"Tuesday Updated"}).end();
})

/**
 * Update Wedn
 * @name PUT /api/business/wednesday
 */

router.put('/wednesday',[],async (req,res)=>{
  let business = await Business.addBusiWednesday(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"Wedn Updated"}).end();
})

/**
 * Update thur
 * @name PUT /api/business/thursday
 */

router.put('/thursday',[],async (req,res)=>{
  let business = await Business.addBusiThursday(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"Thur Updated"}).end();
})

/**
 * Update fri
 * @name PUT /api/business/friday
 */

router.put('/friday',[],async (req,res)=>{
  let business = await Business.addBusiFriday(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"Fri Updated"}).end();
})

/**
 * Update sat
 * @name PUT /api/business/saturday
 */

router.put('/saturday',[],async (req,res)=>{
  let business = await Business.addBusiSaturday(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"Sat Updated"}).end();
})

/**
 * Update sun
 * @name PUT /api/business/sunday
 */

router.put('/sunday',[],async (req,res)=>{
  let business = await Business.addBusiSunday(req.body.name, req.body.address, req.body.content);
  res.status(200).json({business, message:"Sun Updated"}).end();
})


module.exports = router;
