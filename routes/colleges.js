const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('./cors');
const College = require('../models/college');

const collegeRouter = express.Router();
collegeRouter.use(bodyParser.json());

collegeRouter.options('*', cors.corsWithOptions, (req, res) => {   res.header('Content-Type', 'application/json');
res.header("Access-Control-Allow-origin", "*");
res.header('Access-Control-Allow-Methods: GET, POST, OPTIONS'); res.statusCode=200; res.json("okkk"); } );


collegeRouter.route('/')
.get(cors.cors, (req,res,next) => {
          College.find({})
          .then((record) => {
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json(record);
          }, (err) => next(err))
          .catch((err) => next(err));  
});

collegeRouter.route('/all-states')
.get(cors.cors, (req, res, next) => {
    const statesArray = [ "Maharashtra", "Haryana", "Rajasthan", "Uttar Pradesh", "Chandigarh", "Bihar", "Madya Pradesh", "Punjab", "Delhi", "West Bengal", "Mizoram", "Pondicherr", "Sikkim", 'Arunachal Pradesh', 'Jammu and Kashmir', 'Uttarakhand', 'Meghalaya', 'Daman and Diu', 'Arunachal Pradesh', 'Andaman and Nicobar Islands', 'Odisha', 'Nagaland', 'Himachal Pradesh', 'Assam', 'Gujarat']
    var list=[];
    let i;

    function myFunc(i){
        const s = statesArray[i]
        College.find({ state: statesArray[i]})
        .then((rec) => {
            list.push({ type: s, value: rec.length})
            console.log("the value of i->", i)
            if(i==24)
            { console.log("yess")
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(list);}
        })
        .catch((err) => next(err))
    }
    
    for(i=0; i<statesArray.length; i++){
        console.log("the value of i outside->", i)
       myFunc(i)
        
    }
   
})

collegeRouter.route('/all-courses')
.get(cors.cors, (req, res, next) => {
    const coursesArray = [ "CSE", "ECE", "Mech", "Civil", "Chem", "BioTech", "Electrical", "Aero", "PolyTech", "Textile"]
    var list=[];
    let i;

    function myFunc(i){
        const s = coursesArray[i]
        College.find({ 'courses.course_name': coursesArray[i]})
        .then((rec) => {
            list.push({ type: s, value: rec.length})
            console.log("the value of i->", i)
            if(i==9)
            { console.log("yess")
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(list);
            }
        })
        .catch((err) => next(err))
    }
    
    for(i=0; i<coursesArray.length; i++){
        console.log("the value of i outside->", i)
       myFunc(i)
        
    }
   
})

collegeRouter.route('/:collegeId')
.get(cors.cors, (req, res, next) => {
    College.find({ '_id': req.params.collegeId})
    .then((record) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(record);
    }, (err) => next(err))
    .catch((err) => next(err));
})

// collegeRouter.route('/:collegeName')
// .get(cors.cors, (req, res, next) => {
//     College.find({name : req.params.collegeName })
//     .then((record) => {
//         res.statusCode = 200;
//         res.setHeader('Content-Type', 'application/json');
//         res.json(record);
//     }, (err) => next(err))
//     .catch((err) => next(err));
// })

collegeRouter.route('/:collegeId/similarColleges')
.get(cors.cors, (req, res, next) => {
    College.find({ '_id': req.params.collegeId })
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

collegeRouter.route('/state')
.get(cors.cors, (req, res, next) => {
    College.find({})
    .then((record) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(record);
    }, (err) => next(err))
    .catch((err) => next(err))
})

module.exports= collegeRouter;