const express = require('express');
const router = express.Router();

app.get('/celebrities', (req, res, next) => {
  Celebrity.find({})
    .then(celebrity => {
      res.render('./../views/celebrities/index', { celebrity });
    })
    .catch(error => {
      console.log('There has been an error', error);
      next();
    });
});

module.exports = router;
