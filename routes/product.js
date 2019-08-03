var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product');
var passport = require('passport');
require('../configs/passport')(passport);
var multer  = require('multer')
//var path = require("path");
//var ImageRouter = express.Router();
const bodyParser = require('body-parser');
//const middleware = require('./middleware');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// GET ALL 
router.get('/products', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Product.find
    (function (err, product) {
      if (err) return next(err);
      res.json(product);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* GET SINGLE BY ID */
router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Product.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
  
});

/* UPDATE */
router.put('/:id', passport.authenticate('jwt', {session: false}), function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

// SAVE 
router.post('/products', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Product.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

/* DELETE */
router.delete('/:id', passport.authenticate('jwt',{session: false}) ,function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});


getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;