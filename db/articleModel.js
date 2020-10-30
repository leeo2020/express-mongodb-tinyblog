const mongoose = require('mongoose')
const schema = mongoose.Schema({
  author: String,
  title: String,
  content: String,
  createTime: Number
})

var articleModel = mongoose.model('articles', schema)
module.exports = articleModel
