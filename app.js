var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var routes = require('./routes/index');
var users = require('./routes/users');
var puttings = require("./routes/puttings");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "lkiversonlk"}));

var passport = require("passport"), LocalStrategy = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.use('/', routes);
app.use('/users', users);
app.use("/puttings", puttings);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var yaml = require("js-yaml");
var fs = require("fs")
var winston = require("winston");
var config;
try{
    config = yaml.safeLoad(fs.readFileSync("config.yaml", "utf-8"));
}catch(e){
    winston.log("error", "fail to load config.yaml, please confirm the configuration file is correct", e);
    process.exit(1);
}

var Dao = require("./src/dao/adapter").Dao;

try{
    var dao = new Dao(config.database);
    app.set("dao", dao);
}catch(e){
    winston.log("error", "fail to connect to database " + config.database, e);
    process.exit(1);
}

passport.use(new LocalStrategy(
    {
        usernameField : "username",
        passwordField : "password"
    } ,
    function(user, passwd, done){
        var dao = app.get("dao");
        dao.get("logins", {
            username: user,
            password : passwd
        }, function(error, docs){
           if(error){
               winston.log("error", "fail to search users database", e)
               done(null, false, {message : "fail"});
           }else{
               if(docs.length == 0){
                   done(null, false, {message : "incorrect password or non-existed usernmae"});
               }else{
                   var user_id = docs[0]._id;
                   dao.get("users", {
                       id : user_id
                   }, function(error,docs){
                       if(error){
                           done(null, false, {message : "fail to load user information"});
                       }else{
                           if(docs.length == 0){
                               dao.add("users", {
                                   id : user_id
                               }, function(error, docs){
                                   if(error){
                                       done(null, false, {message : "fail to add new user"});
                                   }else{
                                       done(null, docs[0].id);
                                   }
                               });
                           }else{
                               done(null, docs[0].id);
                           }
                       }
                   });
               }
           }
        });
    }
));


module.exports = app;
