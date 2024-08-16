var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session') 
var userRoute = require('./routes/user');
var productRoute = require('./routes/product')
const passport = require('passport')
const userRouter = require('./modules/UserModule')
const flash = require('connect-flash')
const connecttomongo = require('./db')
var app = express();


connecttomongo();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(flash());
// session setup 
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"harshpatil"
}))
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(userRouter.serializeUser());
passport.deserializeUser(userRouter.deserializeUser());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoute);
app.use('/product', productRoute);


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
