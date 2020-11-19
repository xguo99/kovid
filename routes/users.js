const express = require('express');
const Users = require('../models/Users');
const validators = require('./validators');

const router = express.Router();

/**
 * Creates a user
 * @name POST/api/users/user
 */
router.post('/user', [validators.ensureUserNotLoggedIn, validators.validateUsernameLength, validators.validatePasswordLength], (req, res) => {
  if (req.body.username == null || req.body.password == null){
    res.status(400).json({ error: 'Not enough information to create a user.' });
  }

  // leaving this here in case we want to trim whitespace regardless
  req.body.username = req.body.username.trim();

  // Try to sign in user
  const user = Users.createUser(req.body.username, req.body.password);
  if (user === undefined){
    res.status(400).json({ error: 'The username is not available.' });
  } else {
      req.session.uid = user.uid;
      req.session.username = user.username;
      res.status(200).json({ username: req.session.username, message: 'User successfully created. You are now signed in. Session ID: ' + req.session.uid});
  }
});

/**
 * Updates the username of a user
 * @name PUT/api/users/updateUsername
 */
router.put('/updateUsername', [validators.ensureUserLoggedIn, validators.validateUsernameLength], (req, res) => {
  if (req.body.username == null){
    res.status(400).json({ error: 'Not enough information to change username' });
  }

  // leaving this here in case we want to trim whitespace regardless
  req.body.username = req.body.username.trim();

  const user = Users.updateUsername(req.session.uid, req.body.username);
  if (user === undefined){
    res.status(400).json({ error: 'The username is not available.' });
  } else {
      req.session.username = user.username;
      res.status(200).json({ username: req.session.username, message: 'Username has been successfully changed'});
  }
});

/**
 * Updates the password of a user
 * @name PUT/api/users/updatePassword
 */
router.put('/updatePassword', [validators.ensureUserLoggedIn, validators.validatePasswordLength], (req, res) => {
  if (req.body.password == null){
    res.status(400).json({ error: 'Not enough information to change password.' });
  }

  const user = Users.updatePassword(req.session.uid, req.body.password);
  if (user === undefined){
    res.status(400).json({ error: 'The password is not valid.' });
  } else {
    res.status(200).json({ message: 'Your password has been successfully changed'});
  }
});

/**
 * Sign user in.
 * @name POST/api/users/signin
 */
router.post('/signin', [validators.ensureUserNotLoggedIn, validators.validateUsernameLength, validators.validatePasswordLength], (req, res) => {
  if (req.body.username == null || req.body.password == null){
    res.status(401).json({ error: 'Not enough information to sign in.' });
  }
  // Try to sign in user
  const user = Users.signInUser(req.body.username, req.body.password);
  if (user === undefined){
    res.status(404).json({ error: 'The username and/or password is not correct.' });
  } else {
      req.session.uid = user.uid;
      req.session.username = user.username;
      const feed = user.getFreetFeed();
      res.status(200).json({
          username: req.session.username, 
          message: "You are now signed in.",
          feed: feed      
      });
} 
  
});

/**
 * Follow a user
 * @name POST/api/users/follow
 */
router.post('/follow', [validators.ensureUserLoggedIn, validators.validateUsernameLength], (req, res) => {
  if (req.body.username == null){
    res.status(400).json({ error: 'Must imput a valid username' });
  }

  const user = Users.findUserID(req.session.uid);
  const status = user.followUser(req.body.username);
  if (status === undefined){
    res.status(404).json({ error: 'No user with that username has been found'});
  } else if (status) {
    res.status(200).json({ message: `You have successfully followed ${req.body.username}`});
  } else {
    res.status(200).json({ message: `You have successfully unfollowed ${req.body.username}`});
  }
  
});

/**
 * Get the list of users the current user follows
 * @name GET/api/users/following
 */
router.get('/following', [validators.ensureUserLoggedIn], (req, res) => {
  const user = Users.findUserID(req.session.uid);
  const following = user.getMyFollowing();
  
  if (following) {
    res.status(200).json({ following: following });
  } else {
    res.status(401).json({ error: 'An error has occured loading following, please try again.'});
  }
});


/**
 * Sign out current active user
 * @name DELETE/api/users/signout
 */
router.delete('/session', [validators.ensureUserLoggedIn], (req, res) => {
  req.session.username = null;
  req.session.uid = null;
  res.status(200).json({ message: 'You have successfully signed out.' });
});

/**
 * Deletes current active user
 * @name DELETE/api/users/delete
 */
router.delete('/delete', [validators.ensureUserLoggedIn], (req, res) => {
  const user = Users.deleteUser(req.session.uid);
  req.session.username = null;
  req.session.uid = null;
  res.status(200).json({ message: 'You have successfully deleted your account.' });
});


module.exports = router;