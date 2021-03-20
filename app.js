var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const faker = require('faker')
const College = require('./models/college');
const Student = require('./models/student');
var config = require('./config');
var cors = require('./routes/cors');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var collegeRouter = require('./routes/colleges');

var app = express();
app.use(cors.cors);

const mongoose = require('mongoose');
// const url = config.mongoUrl;
// const connect = mongoose.connect(url);
// connect.then((db) => {
//   console.log("Connected correctly to server");
// }, (err) => { console.log(err); });


mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB CONNECTION ERR", err));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/colleges', collegeRouter);
faker.locale = "en_IND";

console.log(faker.date.past().getFullYear())


for(let i=0;i<100;i++)
{
  
  const college = new College({
      name: "College" + `${i+1}`,
      yearOfFounded: faker.random.number({ 'min': 1960, 'max': 2020}),
      city: faker.address.city(),
      state: faker.address.state(),
      country: 'India',
      number_of_student: faker.random.number({
        'min': 100,
        'max': 100
    })
  })
  college.save()
  .then((res) => console.log(res));

  let number_of_courses = faker.random.number({ 'min': 5, 'max': 10});
  coursesList = ['CSE', 'ECE', 'Mech', 'Civil', 'Chem', 'BioTech', 'PolyTech', 'Textile', 'Electrical', 'Aero'];

  for(let j=0;j<number_of_courses;j++)
  {
    college.courses.push({course_name: coursesList[j]})
    college.save()
    .then((res) => console.log(res));
  }

  
  console.log("New College Result==> " + college)

  let students = college.number_of_student;
  
  skillsList = ['C', 'C++', "Java", 'ReactJS', 'NodeJS', "MongoDB", 'Machine Learning', 'Blockchain']
 
  for(var k=0;k<students;k++)
  {
        const student = new Student({
        name: faker.name.findName(),
        yearOfBatch: faker.random.number({ 'min': college.yearOfFounded, 'max': 2020}),
        college_id: college.id,

      })
      

      number_of_skills = faker.random.number({ 'min': 1, 'max': 8});
      for(var m = 0; m < number_of_skills; m++)
      {
          student.skills.push({ skill_name: skillsList[m]})
      }

      student.save()
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  college.save()
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
}

// console.log(faker.address.state())
// console.log(faker.name.findName())
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
