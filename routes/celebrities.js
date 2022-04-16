const express = require('express');
const Celebrity = require('./../models/celebrity');
const celebritiesRouter = express.Router();

// Handle GET request for website root
celebritiesRouter.get('/', (req, res, next) => {
  res.render('index');
});

celebritiesRouter.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrity => {
      res.render('celebrities/index', { celebrity });
    })
    .catch(error => {
      console.log('There has been an error', error);
      next(error);
    });
});

celebritiesRouter.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebritiesRouter.get('/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch(error => {
      next(error);
    });
});

celebritiesRouter.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      res.render('celebrities/show', { celebrity });
    })
    .catch(error => {
      console.log('There has been an error', error);
      next(error);
    });
});

celebritiesRouter.post('/celebrities', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then(celebrity => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      res.render('celebrities/create');
    });
});

celebritiesRouter.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(celebrity => {
      res.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

celebritiesRouter.post('/:id/edit', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  const { id } = req.params;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(celebrity => {
      res.redirect('/celebrities/' + id);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = celebritiesRouter;
