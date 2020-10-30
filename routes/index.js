const express = require('express')
const router = express.Router()
const articleModel = require('../db/articleModel.js')
const moment = require('moment')

router.get('/', function (req, res, next) {
  console.log(req.query)
  var size = parseInt(req.query.size || 3)
  var page = req.query.page || 1
  var username = req.session.username
  var arr = []
  var pages = 0
  articleModel.find().count().then(total => {
    pages = Math.ceil(total / size) // 总页数
    articleModel.find().sort({ createTime: -1 }).skip((page - 1) * size).limit(size).then(docs => {
      arr = docs.slice() // 非传统数组
      for (let i = 0; i < arr.length; i++) {
        arr[i].createTimeZH = moment((arr[i].createTime)).format('YYYY/MM/DD HH:mm:ss')
      }
      // console.log(arr, username)
      res.render('index', {
        data: {
          list: arr,
          total: pages,
          username: username
        }
      })
    }).catch(err => {
      res.redirect('/')
    })
  })
})

router.get('/regist', function (req, res, next) {
  res.render('regist', {})
})

router.get('/login', function (req, res, next) {
  res.render('login', {})
})

router.get('/write', function (req, res, next) {
  	 console.log(req.session.username, req.query.id)
  	 res.render('write', {
   		username: req.session.username,
  	    id: req.query.id
  })
})

router.get('/detail', function (req, res, next) {
  var username = req.session.username
  var id = req.query.id

  id = new Object(id)
  articleModel.findById(id).then(doc => {
  	var createTimeZH = moment(doc.createTime).format('YYYY/MM/DD HH:mm:ss')
  	console.log(createTimeZH)
    res.render('detail', {
    	username: req.session.username,
    	doc,
    	createTimeZH: createTimeZH
    	 })
  })
})
module.exports = router
