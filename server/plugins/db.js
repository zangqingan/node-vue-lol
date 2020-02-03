//导出一个函数对象接受一个app参数，外面传进来的express实例app。
module.exports = app => {
    // 开启express和mongodb数据库的连接
    const mongoose = require("mongoose")
    // 开启数据库连接
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-lol',{useNewUrlParser:true, useUnifiedTopology: true ,useFindAndModify:true})
}