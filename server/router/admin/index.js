// 经过检查可以看出路由大部份是一样的，所以这里封装一个统一的curd模块。
//思路是加一个中间件将模型加载赋值到req中传递到下一个中间件。
//导出一个函数对象接受一个app参数，外面传进来的express实例app。
module.exports = app => {
    // express子路由
    const express = require('express')
    const router = express.Router({
        // 合并参数，在路由实例内也可以使用resource
        mergeParams:true
    })
    // 挂载子路由
    app.use('/admin/api/rest/:resource',async (req,res,next) => {
        //引入文档处理模块
        // 使用inflection模块转换类名单复数形式(通过前端传过来的路径参数转化为单数形式的模型名)
        const modelName = require('inflection').classify(req.params.resource)
        // 引入模型并添加到req对象上传给下一个中间件
        req.Model = require(`../../models/${modelName}`)
        next()
    },router)

    // 通用curd接口
    router.post('/',async (req,res) => {
        // 获取前端数据并写入数据库中
        const model = await req.Model.create(req.body)
        //把写入的内容返回
        res.send(model)
    })
    // 修改分类后更新路由
    router.put('/:id',async (req,res) => {
        // 获取前端数据并写入数据库中
        const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
        //把写入的内容返回
        res.send(model)
    })
    //删除指定分类路由
    router.delete('/:id',async (req,res) => {
        // 获取前端数据并写入数据库中
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        //把写入的内容返回
        res.send({
            success:true
        })
    })
    // 分类列表路由
    router.get('/',async (req,res) => {
        // 获取数据库中Category集合(表)中的数据
        const queryOptions = {}
        if(req.Model.modelName === 'Category'){
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(10)
        res.send(items)
    })
    // 分类列表详情路由
    router.get('/:id',async (req,res) => {
        // 通过前端传过来的id在数据库中查找对应值并返回
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })












}