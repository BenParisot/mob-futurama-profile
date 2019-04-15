const { Router } = require('express');
const Profile = require('../models/Profile');

module.exports = Router()
//create a new profile
//name, favorite character, tagline
  .post('/', (req, res) => {
    const {
      name,
      favChar,
      quote
    } = req.body;
    Profile
      .create({ name, favChar, quote })
      .then(profile => {
        res.send(profile);
      });
  })
  .get('/', (req, res) => {
    Profile.find()
      .then(response => {
        res.send(response);
      });
  });


//get all profiles

// get profile by id

// patch/update by id

// delete by id
