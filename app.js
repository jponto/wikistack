//Imports
const express = require('express');
const app = express();
const morgan = require('morgan');
const Sequelize = require('sequelize');
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

//db setup
const { db } = require('./models');
db.authenticate().then(() => {
  console.log('connected to the database');
});

//Views
const layout = require('./views/layout');

//Middleware
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

//calling the routers from routes folder
app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

//Routes
app.get('/', (req, res) => {
  //res.send(layout(''))
  res.redirect('/wiki');
});

//Sync database + connect to port
const init = async function () {
  await db.sync({});
  app.listen('1234', function () {
    console.log('connected!');
  });
};

init();

//Exports
