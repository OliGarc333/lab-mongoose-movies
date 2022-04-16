const express = require('express');
const Movie = require('./../models/movie.js');
const moviesRouter = new express.Router();

moviesRouter.get('/celebrities', (req, res, next) => {
  Movie.find()
    .then(movie => {
      res.render('celebrities/index', { movie });
    })
    .catch(error => {
      console.log('There has been an error', error);
      next(error);
    });
});

module.exports = moviesRouter;
