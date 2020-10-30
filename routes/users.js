const express = require('express')
const router = express.Router()
const userModel = require('../db/userModel')
const bcrypt = require('bcrypt')

/* GET users listing. */
router.post('/regist', function (req, res, next) {
  const { username, password, password2 } = req.body
  userModel.find({ username }).then(docs => {
    if (docs.length > 0) {
      res.redirect('/regist')
    } else {
      bcrypt.hash(password, 5, function (err, hash) {
        if (!err) {
          userModel.insertMany({
            username,
            password: hash
          })
          res.redirect('/login')
        }
      })
    }
  })
})

router.post('/login', function (req, res, next) {
  const { username, password } = req.body
  userModel.find({ username }, { password: 1 }).then(doc => {
    if (doc.length > 0) {
      console.log(doc[0].password)
      bcrypt.compare(password, doc[0].password).then(result => {
        if (result) {
          req.session.username = username
          req.session.isLogin = true
          res.redirect('/')
        } else {
          // console.log('密码错误')
          res.redirect('/login')
        }
      })
    } else {
      // console.log('用户不存在')
      res.redirect('/login')
    }
  }).catch(err => {
    // console.log('数据库无')
    res.redirect('/login')
  })
})

router.get('/logout', function (req, res, next) {
  req.session.username = null
  req.session.isLogin = false
  res.redirect('/')
})

module.exports = router
