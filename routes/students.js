const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./cors');
const Student = require('../models/student');

const studentRouter = express.Router();
studentRouter.use(bodyParser.json());

studentRouter.options('*', cors.corsWithOptions, (req, res) => {   res.header('Content-Type', 'application/json');
res.header("Access-Control-Allow-origin", "*");
res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); res.statusCode=200; res.json("okkk"); } );

studentRouter.route('/:collegeId')
.get(cors.cors, (req,res,next) => {
          Student.find({ college_id: req.params.collegeId})
          .then((record) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(record);
          }, (err) => next(err))
          .catch((err) => next(err));  
});

studentRouter.route('/:collegeId/:studentId')
.get(cors.cors, (req,res,next) => {
    Student.find({ _id: req.params.studentId})
    .then((record) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(record);
    }, (err) => next(err))
    .catch((err) => next(err));  
});

module.exports= studentRouter;