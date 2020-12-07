const express = require('express');

const Reply = require('../models/Reply');

const router = express.Router();

/**
 * Post a new reply.
 * 
 * @name POST /api/replies
 */
router.post('/', [], async (req, res) => {   
  if (req.body.reply.length > 0){     
    try{
        await Reply.addOne(req.body.reviewID, req.body.reply);
        res.status(200).json({message:"Successfully posted your reply!."}).end();
    } catch(err){
        res.status(400).json({error: err}).end();
        //res.status(400).json({error: `You have to sign in as the business owner to reply to any review`}).end();
    }
  } else{
    res.status(400).json({ error: 'Cannot submit an empty reply'}).end();
  }
});

/**
 * Get all replies received by a customer.
 * 
 * @name GET /api/replies/?customer=username
 */
router.get('/', [], async (req, res) => { 
    const reviews = await Reply.getAllByCust(req.query.customer);
    res.status(200).json({reviews}).end();
});

module.exports = router;
