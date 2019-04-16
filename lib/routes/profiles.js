const { Router } = require('express');
const Profile = require('../models/Profile');
const getQuoteByChar = require('../services/futuramaApi');

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
  })
  
  .get('/:id', (req, res) => {
    const { id } = req.params;
    Profile
      .findById(id)
      .then(profile => res.send(profile));
  })

  .patch('/:id', (req, res) => {
    const { id } = req.params;
    Profile
      .findById(id)
      .then(oldObject => {
        oldObject.favChar = req.body.favChar;
        return oldObject;
      })
      .then(newObject => {
        res.send(newObject);
      });
  })
  
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    Profile
      .findByIdAndDelete(id)
      .then(result => {
        res.send(result);
      });
  })
;


// patch/update by id

// delete by id
