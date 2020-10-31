const express = require('express')
const path = require('path')
const articleModel = require(path.join(__dirname, '../db/articleModel'))
const fs = require('fs')
const multiparty = require('multiparty')
const moment = require('moment')

const router = express.Router()
/* GET users listing. */
router.post('/write', function (req, res, next) {
  var { author, title, content, id } = req.body
  author = req.session.username
  var createTime = Date.now()
  console.log('创建事件时间' + createTime + moment(createTime).format('YYYY/MM/DD HH:mm:ss'))
  if (!id) {
    id = new Object(id)
    articleModel.updateOne({
      author: author,
      title: title,
      content: content,
      createTime: createTime
    }).then(data => {
      res.redirect('/')
    }).catch(err => {
      res.redirect('/write')
    })
  } else {
    articleModel.insertMany({ author, title, content, createTime }).then(data => {
      res.redirect('/')
    }).catch(err => {
      res.redirect('/write')
    })
  }
})

router.get('/delete', function (req, res, next) {
  var { id } = req.query
  id = new Object(id)
  console.log(id)
  articleModel.deleteOne({ _id: id })
    .then(doc => {
      res.redirect('/')
    }).catch(error => {
      res.redirect('/')
    })
})

router.post('/upload', function (req, res, next) {
  var form = new multiparty.Form()
  form.parse(req, function (err, fields, files) {
    if (!err) {
      var file = files.filedata[0]
      console.log(file)
      var inp = fs.createReadStream(file.path)
      var out = fs.createWriteStream(path.join(__dirname, '..', 'public/imgs', file.originalFilename))
      console.log(out)
      inp.pipe(out)
      out.on('close', (err, data) => {
        if (!err) {
          // res.send('上传成功')
          console.log('上传成功')
          res.json({
            err: 0,
            msg: '/imgs/' + file.originalFilename
          })
        } else {
          // res.send('上传失败')
          console.log('上传失败')
        }
      })
    } else {
      // res.send('上传失败')
      console.log('上传失败')
    }
  })
})

module.exports = router
