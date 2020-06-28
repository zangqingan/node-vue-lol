module.exports = options => {
    return async (req,res,next) => {
        //引入文档处理模块
        // 使用inflection模块转换类名单复数形式(通过前端传过来的路径参数转化为单数形式的模型名)
        const modelName = require('inflection').classify(req.params.resource)
        // 引入模型并添加到req对象上传给下一个中间件
        req.Model = require(`../models/${modelName}`)
        next()
    }
}