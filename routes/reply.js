const express = require('express');

const Reply = require('../models/Reply');

const router = express.Router();

/**
 * Post a new reply.
 * 
 * @name POST /api/reply
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
 * @name GET /api/reply/customer/:username
 */
router.get('/customer/:username', [], async (req, res) => { 
    const replies = await Reply.getAllByCust(req.params.username);
    res.status(200).json({replies}).end();
});

module.exports = router;
