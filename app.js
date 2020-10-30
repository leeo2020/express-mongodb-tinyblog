var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const session = require('express-session')
const favicon = require('serve-favicon')

const indexRouter = require(path.join(__dirname, './routes/index'))
const usersRouter = require(path.join(__dirname, './routes/users'))
const articlesRouter = require(path.join(__dirname, './routes/articles'))
const db = require(path.join(__dirname, './db/connectDB'))

var app = express()
app.use(favicon(path.join(__dirname, './public', './favicon.ico')))

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({
  secret: 'sz2009html5',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}))

app.use(express.static(path.join(__dirname, 'public')))

app.get('*', (req, res, next) => {
  if (req.session.username) {
    next()
  } else if (req.url == '/regist' || req.url == '/login') {
    next()
  } else {
    res.redirect('/login')
  }
})

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/articles', articlesRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
