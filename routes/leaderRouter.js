var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Leaders = require('../models/leadership');
var Verify = require('./verify');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.get(function(req,res,next){
  Leaders.find(req.query)
    .exec(function(err, leader){
    if(err) next(err);
    res.json(leader);
  });
})

.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
  Leaders.create(req.body,function(err,leader){
    if(err) next(err);

    console.log('Leader created!');
    var id = leader._id;
    res.writeHead(200,{'Content-Type':'plain/text'});
    res.end('Leader added with id: '+id);
  });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
  Leaders.remove({}, function(err,resp){
    if(err) next(err);
    res.json(resp);
  });
});

leaderRouter.route('/:leaderId')

.get(function(req,res,next){
  Leaders.findById(req.params.leaderId,function(err,leader){
    if(err) next(err);

    res.json(leader);
  });
})

.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
  Leaders.findByIdAndUpdate(req.params.leaderId, {
    $set: req.body
  }, {
    new:true
  }, function(err, leader){
    if(err) next(err);
    res.json(leader);
  });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin,function(req,res,next){
  Leaders.findByIdAndRemove(req.params.leaderId, function(err,resp) {
    if(err) next(err);
    res.json(resp);
  });
});

module.exports = leaderRouter;
