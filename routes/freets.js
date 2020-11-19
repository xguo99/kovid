const express = require('express');
const Freets = require('../models/Freets');
const Users = require('../models/Users');
const Busi = require('../models/Business')
const validators = require('./validators');

const router = express.Router();

/**
 * Creates a new freet
 * @name POST/api/freets/create
 */
router.post('/create', [validators.ensureUserLoggedIn, validators.validateFreetLength], (req, res) => {
  if (req.body.content == null){
    res.status(400).json({ error: 'Please provide a freet.' });
  } else {
    // Create the freet
    const freet = Freets.createFreet(req.body.content, req.session.uid);
    res.status(200).json({ username: req.session.username, message: 'Freet successfully created', freet: freet});
  }
});

/**
 * Retrieves all freets
 * @name GET/api/freets/myFeed
 */
router.get('/myFeed',[validators.ensureUserLoggedIn] ,(req, res) => {
    const user = Users.findUserID(req.session.uid);
    const testgeo=Busi.createBusi('a','b','222 Broadway');
     /*eslint-disable no-console */
    console.log(testgeo);
    console.log('hello');
    /*eslint-enable no-console */
    req.session.username = user.username;
    let feed = user.getFreetFeed();
    if (feed.length === 0){
        feed = Freets.viewAllFreets();
    }
    res.status(200).json({
        username: req.session.username, 
        message: testgeo,
        freets: feed      
    });
});

/**
 * Retrieves all freets of from authors the user follows
 * @name GET/api/freets/allFreets
 */
router.get('/allFreets', (req, res) => {
    const freets = Freets.viewAllFreets();
    res.status(200).json({ freets: freets});
});


/**
 * Retrieves all freets written by a specific user
 * @name POST/api/freets/author
 */

router.post('/author', [validators.validateAuthorNameLength], (req, res) => { 

    const freets = Freets.viewFreetsByAuthor(req.body.author);
    if (freets === undefined){
        res.status(404).json({ error: `There is no user by the username ${req.body.author}.`});
    } else {
        res.status(200).json({ message: freets});
    }
});

/**
 * Refreets a authors freet.
 * @name POST/api/freets/refreet
 */
router.post('/refreet', [validators.ensureUserLoggedIn, validators.validateAuthorNameLength], (req, res) => { 
    
    if (req.body.id == null){
        return res.status(400).json({ error: `Please enter a valid freet ID`});
    } else {
        const user = Users.findUserID(req.session.uid);
        if (user === undefined){
          res.status(403).json({ error: 'An error has occured. Please sign out and sign back in.' }).end();
        }
        
        const freetId = parseInt(req.body.id);
        const new_freet = Freets.reFreet(req.session.uid, req.body.author, freetId);
        if (new_freet === undefined) {
            res.status(404).json({ error: 'A freet with this ID does not exist' });
        } else {
            res.status(200).json({ username: req.session.username, message: new_freet});
        }
    }

});

/**
 * Upvotes an author's freet
 * @name POST/api/freets/upvote
 */
router.post('/upvote', [validators.ensureUserLoggedIn, validators.validateAuthorNameLength], (req, res) => {
    if (req.body.id == null) {
        return res.status(400).json( { error: `Please enter a valid freet ID`});
    } else {
        const user = Users.findUserID(req.session.uid);
        if (user === undefined){
          res.status(403).json({ error: 'An error has occured. Please sign out and sign back in.' }).end();
        }

        const freetId = parseInt(req.body.id);
        const upvotedFreet = Freets.upvoteFreet(req.session.uid, req.session.username, req.body.author, freetId);
        if (upvotedFreet === undefined) {
            res.status(404).json({ error: `A freet with this ID does not exist`});
        } else {
            res.status(200).json({ username: req.session.username, message: upvotedFreet});
        }
    }
});


/**
 * Edits a freet
 * @name PUT/api/freets/Freet
 */
router.put('/Freet', [validators.ensureUserLoggedIn, validators.validateFreetLength], (req, res) => {
    const user = Users.findUserID(req.session.uid);
    if (user === undefined){
        res.status(403).json({ error: 'An error has occured. Please sign out and sign back in.' }).end();
    }
    const freet = user.getFreetbyId(parseInt(req.body.id));
    if (freet === undefined) {
        res.status(404).json({ error: 'This freet does not exist' });
    } else if (freet.reFreet) {
        res.status(401).json({ error: 'You cannot edit a refreet.' });
    } else {
        const result = freet.editFreet(req.body.content);
        if (result === undefined) {
            res.status(401).json({ error: 'You cannot edit a refreet.' });
        } else {
            res.status(200).json({ username: req.session.username, message: freet});
        }
    }
});

/**
 * Deletes a freet
 * @name DELETE/api/freets/:id
 */
router.delete('/:id', [validators.ensureUserLoggedIn], (req, res) => {
        const user = Users.findUserID(req.session.uid);
        if (user === undefined){
            res.status(403).json({ error: 'An error has occured. Please sign out and sign back in.' }).end();
        }
        const freet = user.getFreetbyId(parseInt(req.params.id));
        if (freet === undefined) {
            res.status(404).json({ error: 'No freet exists with the given id.' });
        } else {
            user.removeFreet(freet.id);
            res.status(200).json({ username: req.session.username, message: "Freet successfully deleted"});
        }
    // }
});

/**
 * Catch empty delete ids
 * @name DELETE/api/freets/
 */
router.delete('/', [validators.ensureUserLoggedIn], (req, res) => {
    res.status(400).json({ error: 'You must enter the ID of the freet to delete.' });
});


module.exports = router;
