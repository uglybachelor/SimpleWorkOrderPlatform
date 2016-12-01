var express = require('express')
var path = require('path')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var Promise = require('bluebird')
var session = require('express-session')
var passport = require('passport')
var LocalStrategy = require('passport-local')

var routes = require('./routes/index')
var util = require('./models/util')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({ secret: 'ytx', cookie: { maxAge: 6000000 }}));
app.use(passport.initialize())
app.use(passport.session())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', routes)

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        util.findUser(username)
        .then(function(user) {
            if (password !== user[0].password) {
                console.log('密码错误')
                return done(null, false, { message: 'Incorrect password.' })
            }
            console.log('登陆成功')
            return done(null, user)
        }).catch(function(err) {
            console.log('登陆失败:', err)
        })
    }
))


passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
