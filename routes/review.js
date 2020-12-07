const express = require('express');

const Review = require('../models/Review');

const router = express.Router();

/**
 * Post a new review.
 * 
 * @name POST /api/reviews
 */
router.post('/', [], async (req, res) => {   
  if (req.body.service > 0 && req.body.covid > 0 && req.body.comment.length>0){     
    try{
        await Review.addOne(req.body.username, req.body.business, req.body.address, req.body.service, req.body.covid, req.body.comment);
        res.status(200).json({message:"Successfully posted your review!."}).end();
    } catch(err){
      res.status(400).json({error: err}).end();
    }
  } else{
    res.status(400).json({ error: 'Please fill in all ratings and provide some comments!'}).end();
  }
});

/**
 * Get all review data for business.
 * 
 * @name GET /api/reviews/?business=busiName&address=addr
 */
router.get('/?business=busiName&address=addr', [], async (req, res) => { 
  console.log("here");
  const reviewData=await Review.getReviewData(req.query.business,req.query.address);
  const reviews=reviewData.allReviews;
  const serviceRating=reviewData.serviceRating;
  const covidRating=reviewData.covidRating;
  res.status(200).json({reviews,serviceRating,covidRating}).end();
});

/**
 * Get all reviews made by a customer.
 * 
 * @name GET /api/reviews/?customer=username
 */
router.get('/?customer=username', [], async (req, res) => { 
    const reviews=await Review.getAllByCust(req.query.customer);
    res.status(200).json({reviews}).end();
});

module.exports = router;
