// 定义模型，及表结构
const mongoose = require('mongoose')

// 定义schema
const schema = new mongoose.Schema({
    name: { type:String},
    parent:{
        type:mongoose.SchemaTypes.ObjectId,ref:'Category'
    }
})

// 导出集合模型对象
module.exports = mongoose.model('Category',schema)