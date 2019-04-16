const { Router } = require('express');
const Profile = require('../models/Profile');
const { getQuoteByChar } = require('../services/futuramaApi');

module.exports = Router()
  .post('/', (req, res) => {
    const {
      name,
      favChar,
    } = req.body;
    getQuoteByChar(req.body)
      .then(quote => {
        return Profile
          .create({ name, favChar, quote });
      })
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
    const {
      name,
      favChar, 
    } = req.body;
    getQuoteByChar(req.body)
      .then(quote => {
        Profile
          .findByIdAndUpdate(id, { name, favChar, quote })
          .then(updatedProfile => res.send(updatedProfile));
      });
  })
  
  .delete('/:id', (req, res) => {
    const { id } = req.params;
    Profile
      .findByIdAndDelete(id)
      .then(result => {
        res.send(result);
      });
  });

