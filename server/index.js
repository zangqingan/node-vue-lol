// 使用express框架创建web服务器
const express = require('express')
const app = express()

// 注册跨域和body数据解析中间件
app.use(require('cors')())
app.use(express.json())

//上传图片静态资源托管
app.use('/uploads',express.static(__dirname + '/uploads'))


// 引用通用admin端的curd路由,并把app对象传入
require('./router/admin/index')(app)
// 分开路由
// 引用admin端的categories路由,并把app对象传入
require('./router/admin/categories')(app)
// 引入mongoose操作数据库
require('./plugins/db')(app)



app.listen(3000,() => {
    console.log('server is running on peort 3000')
})