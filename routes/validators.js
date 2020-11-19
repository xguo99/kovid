const express = require('express');

const Freets = require('../models/Freets');
const Users = require('../models/Users');

const max_freet_length = 140;
const min_freet_length = 0;

// Authorizers
const ensureUserNotLoggedIn = (req, res, next) => {
    if (req.session.uid != null) {
        res.status(400).json({ error: 'You are already signed in.' }).end();
        return;
    }
    next()
};

const ensureUserLoggedIn = (req, res, next) => {
    if (req.session.uid == null) {
        res.status(401).json({ error: 'You are not currently signed in' }).end();
        return;
    }
    next();
};

// Input validation
const validateFreetLength = (req, res, next) => {
    if (req.body.content.length >= max_freet_length){
        res.status(400).json({ error: `The freet must not exceed ${max_freet_length} characters.` }).end();
        return;
    } else if (req.body.content.length <= min_freet_length){
        res.status(400).json({ error: `The freet must be more than ${min_freet_length} characters.` }).end();
        return;
    } else {
        next();
    }
};

const validateAuthorNameLength = (req, res, next) => {
    if (req.body.author == null) {
        return res.status(400).json({ error: `Username must be at least 1 character.`}).end();
    } else {
        req.body.author = req.body.author.trim();
        if (req.body.author.length === 0) {
            res.status(400).json({ error: `Username must be at least 1 non-whitespace character.`}).end();
            return;
        }
    }
    next();
};

/*
precondition: req.body.username != null
*/
const validateUsernameLength = (req, res, next) => {
    let trimmedUsername = req.body.username.trim();
    if (trimmedUsername.length === 0) {
        res.status(400).json({ error: 'The username must be at least 1 non-whitespace character.' }).end();
        return;
    }
    next();
}

/*
precondition: req.body.password != null
*/
const validatePasswordLength = (req, res, next) => {
    if (req.body.password.length < 6) {
        res.status(400).json({ error: 'The password must be at least 6 characters.' }).end();
        return;
    }
    next();
}

module.exports = {
    ensureUserNotLoggedIn,
    ensureUserLoggedIn,
    validateFreetLength,
    validateAuthorNameLength,
    validateUsernameLength,
    validatePasswordLength,
  };