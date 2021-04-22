const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./cors');
const College = require('../models/college');

const collegeCoursesRouter = express.Router();
collegeCoursesRouter.use(bodyParser.json());

collegeCoursesRouter.options('*', cors.corsWithOptions, (req, res) => {   res.header('Content-Type', 'application/json');
res.header("Access-Control-Allow-origin", "*");
res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); res.statusCode=200; res.json("okkk"); } );


collegeCoursesRouter.route('/:courseName')
.get(cors.cors, (req, res, next) => {
    College.find({ "courses.course_name": req.params.courseName })
    .then((record) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(record);
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports = collegeCoursesRouter;