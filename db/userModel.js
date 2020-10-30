const mongoose = require('mongoose')
const schema = mongoose.Schema({
  username: String,
  password: String
})

var userModel = mongoose.model('users', schema)
module.exports = userModel
