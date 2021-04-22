const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./cors');
const College = require('../models/college');

const collegeStatesRouter = express.Router();
collegeStatesRouter.use(bodyParser.json());

collegeStatesRouter.options('*', cors.corsWithOptions, (req, res) => {   res.header('Content-Type', 'application/json');
res.header("Access-Control-Allow-origin", "*");
res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); res.statusCode=200; res.json("okkk"); } );


collegeStatesRouter.route('/')
.get(cors.cors, (req, res, next) => {
    College.find({})
    .then((record) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(record);
    }, (err) => next(err))
    .catch((err) => next(err))
})

collegeStatesRouter.route('/:state')
.get(cors.cors, (req, res, next) => {
    College.find({ state: req.params.state})
    .then((record) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(record);
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = collegeStatesRouter;

