const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tinyblog', {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
const conn = mongoose.connection
if (conn) {
    console.log('连接数据库成功!')
} else {
    console.log('连接数据库失败!')
}