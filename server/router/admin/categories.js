//导出一个函数对象接受一个app参数，外面传进来的express实例app。
module.exports = app => {
    // express子路由
    const express = require('express')
    // 创建express路由实例
    const router = express.Router()
    // 挂载子路由 ‘/admin/api/router’
    app.use('/admin/api',router)
    //引入数据模型
    const Category = require('../../models/Category')
    // 具体新建分类路由
    router.post('/categories',async (req,res) => {
        // 获取前端数据并写入数据库中
        const model = await Category.create(req.body)
        //把写入的内容返回
        res.send(model)
    })
    // 修改分类后更新路由
    router.put('/categories/:id',async (req,res) => {
        // 获取前端数据并写入数据库中
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        //把写入的内容返回
        res.send(model)
    })
    //删除指定分类路由
    router.delete('/categories/:id',async (req,res) => {
        // 获取前端数据并写入数据库中
        await Category.findByIdAndDelete(req.params.id,req.body)
        //把写入的内容返回
        res.send({
            success:true
        })
    })
    // 分类列表路由
    router.get('/categories',async (req,res) => {
        // 获取数据库中Category集合(表)中的数据
        const items = await Category.find().populate('parent').limit(10)
        res.send(items)
    })
    // 分类列表详情路由
    router.get('/categories/:id',async (req,res) => {
        // 通过前端传过来的id在数据库中查找对应值并返回
        const model = await Category.findById(req.params.id)
        res.send(model)
    })

}