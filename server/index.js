//导入express
const express = require('express')
const app = express()

// 导入 cors 中间件 
const cors = require('cors')
app.use(cors())

//配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//配置解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))


// 错误中间件 
const Joi = require('joi')
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) return res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败')
    res.cc(err)
})

// 导入登录用户路由模块 
const userRouter = require('./router/user')
app.use('/api/admin', userRouter)

//导入获取客户数据路由模块
const CustomerRouter = require('./router/Customer')
app.use('/api/admin/customer', CustomerRouter)

app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})
