const express = require("express");
// const bodyParser = require('body-parser');
const cors = require("cors");
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const morgan = require('morgan');
const { database } = require('./src/keys');


// Intializations
const app = express();
require('./src/database/db');
// Settings
 app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());

app.use(session({
  secret: 'pruebanodeexpress',
  resave: true,
  saveUninitialized: true,
  store: new MySQLStore(database)
}));


// Global variables
app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});

// Routes
app.use(require('./src/routes/index'));
app.use(require('./src/routes/login'));
app.use('/comments', require('./src/routes/comments'));
app.use('/users', require('./src/routes/users'));

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('404');
});

// Starting
app.listen(app.get('port'), () => {
  console.log('Server is in port', app.get('port'));
});