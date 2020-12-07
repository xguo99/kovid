const express = require('express');

const Business = require('../models/Business');
const Review = require('../models/Review');

const router = express.Router();

/**
 * Create new business.
 * 
 * @name POST /api/businesses
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
 * @name POST /api/businesses/signin
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
 * @name POST /api/businesses/signout 
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
 * @name GET /api/businesses/:businessName/:address/description
 */
router.get('/:businessName/:address/description',[],async (req,res)=>{
  try{
  let description = await Business.getBusiDescription(req.params.businessName, req.params.address);
  res.status(200).json({data:description, message: 'Get description'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Description
 * @name PUT /api/businesses/:businessName/:address/description
 */

 router.put('/:businessName/:address/description',[],async (req,res)=>{
    let business = await Business.addBusiDescription(req.params.businessName, req.params.address, req.body.content);
    res.status(200).json({business, message:"Description Updated"}).end();
 })

 /**
 * Get CovidInfo
 * @name GET /api/businesses/:businessName/:address/CovidInfo
 */
router.get('/:businessName/:address/CovidInfo',[],async (req,res)=>{
  try{
  let CovidInfo = await Business.getBusiCovidInfo(req.params.businessName, req.params.address);
  res.status(200).json({data: CovidInfo, message: 'Get CovidInfo'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update CovidInfo
 * @name PUT /api/businesses/:businessName/:address/CovidInfo
 */

router.put('/:businessName/:address/CovidInfo',[],async (req,res)=>{
  let business = await Business.addBusiCovidInfo(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"CovidInfo Updated"}).end();
})

 /**
 * Get Category
 * @name GET /api/businesses/:businessName/:address/category
 */
router.get('/:businessName/:address/category',[],async (req,res)=>{
  try{
  let category = await Business.getBusiCategory(req.params.businessName, req.params.address);
  res.status(200).json({data:category, message: 'Get category'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Category
 * @name PUT /api/businesses/:businessName/:address/category
 */

 router.put('/:businessName/:address/category',[],async (req,res)=>{
    let business = await Business.addBusiCategory(req.params.businessName, req.params.address, req.body.content);
    res.status(200).json({business, message:"Category Updated"}).end();
 })

 /**
 * Get Mask
 * @name GET /api/businesses/:businessName/:address/mask
 */
router.get('/:businessName/:address/mask',[],async (req,res)=>{
  try{
  let mask = await Business.getBusiMask(req.params.businessName, req.params.address);
  res.status(200).json({data:mask, message: 'Get mask'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Mask
 * @name PUT /api/businesses/:businessName/:address/mask
 */

router.put('/:businessName/:address/mask',[],async (req,res)=>{
  let mask = await Business.addBusiMask(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({mask, message:"mask Updated"}).end();
})

/**
 * Get Hand Sanitizer
 * @name GET /api/businesses/:businessName/:address/handSanitizer
 */
router.get('/:businessName/:address/handSanitizer',[],async (req,res)=>{
  try{
  let handSanitizer = await Business.getBusiHandSanitizer(req.params.businessName, req.params.address);
  res.status(200).json({data:handSanitizer, message: 'Get hand sanitizer'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

/**
 * Update Hand Sanitizer
 * @name PUT /api/businesses/:businessName/:address/handSanitizer
 */

router.put('/:businessName/:address/handSanitizer',[],async (req,res)=>{
  let handSanitizer = await Business.addBusiHandSanitizer(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({handSanitizer, message:"hand sanitizer Updated"}).end();
})

 /**
 * Get Schedule
 * @name GET /api/businesses/:businessName/:address/schedule
 */
router.get('/:businessName/:address/schedule',[],async (req,res)=>{
  try{
  let monday = await Business.getBusiSchedule(req.params.businessName, req.params.address);
  res.status(200).json({data:monday, message: 'Get schedule'});
  }
  catch{
    res.status(400).json({error: `Failed`}).end();
  }
});

 /**
 * Update Monday
 * @name PUT /api/businesses/:businessName/:address/monday
 */

router.put('/:businessName/:address/monday',[],async (req,res)=>{
  let business = await Business.addBusiMonday(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"Monday Updated"}).end();
})

 /**
 * Update Tue
 * @name PUT /api/businesses/:businessName/:address/tuesday
 */

router.put('/:businessName/:address/tuesday',[],async (req,res)=>{
  let business = await Business.addBusiTuesday(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"Tuesday Updated"}).end();
})

/**
 * Update Wedn
 * @name PUT /api/businesses/:businessName/:address/wednesday
 */

router.put('/:businessName/:address/wednesday',[],async (req,res)=>{
  let business = await Business.addBusiWednesday(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"Wedn Updated"}).end();
})

/**
 * Update thur
 * @name PUT /api/businesses/:businessName/:address/thursday
 */

router.put('/:businessName/:address/thursday',[],async (req,res)=>{
  let business = await Business.addBusiThursday(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"Thur Updated"}).end();
})

/**
 * Update fri
 * @name PUT /api/businesses/:businessName/:address/friday
 */

router.put('/:businessName/:address/friday',[],async (req,res)=>{
  let business = await Business.addBusiFriday(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"Fri Updated"}).end();
})

/**
 * Update sat
 * @name PUT /api/businesses/:businessName/:address/saturday
 */

router.put('/:businessName/:address/saturday',[],async (req,res)=>{
  let business = await Business.addBusiSaturday(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"Sat Updated"}).end();
})

/**
 * Update sun
 * @name PUT /api/businesses/:businessName/:address/sunday
 */

router.put('/:businessName/:address/sunday',[],async (req,res)=>{
  let business = await Business.addBusiSunday(req.params.businessName, req.params.address, req.body.content);
  res.status(200).json({business, message:"Sun Updated"}).end();
})

/**
 * Get all review data for business.
 * 
 * @name GET /api/businesses/:businessName/:address/reviews
 */
router.get('/:businessName/:address/reviews', [], async (req, res) => { 
  console.log("here");
  const reviewData=await Review.getReviewData(req.params.businessName,req.params.address);
  const reviews=reviewData.allReviews;
  const serviceRating=reviewData.serviceRating;
  const covidRating=reviewData.covidRating;
  res.status(200).json({reviews,serviceRating,covidRating}).end();
});


module.exports = router;
