const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./cors');
const College = require('../models/college');

const collegeNameRouter = express.Router();
collegeNameRouter.use(bodyParser.json());

collegeNameRouter.options('*', cors.corsWithOptions, (req, res) => {   res.header('Content-Type', 'application/json');
res.header("Access-Control-Allow-origin", "*");
res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); res.statusCode=200; res.json("okkk"); } );


collegeNameRouter.route('/:collegeName')
.get(cors.cors, (req, res, next) => {
    College.find({ name: req.params.collegeName })
    .then((record) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(record);
    }, (err) => next(err))
    .catch((err) => next(err))
})

collegeNameRouter.route('/:collegeName/similarColleges')
.get(cors.cors, (req, res, next) => {
    College.find({ name: req.params.collegeName })
    .then((record) => {
        College.find({ state: record[0].state})
        .then((record) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(record);
        }, (err) => next(err))
        .catch((err) => next(err));
        
    }, (err) => next(err))
    .catch((err) => next(err));
})
module.exports = collegeNameRouter;