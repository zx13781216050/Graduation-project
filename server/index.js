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

//导入获取地区数据路由模块
const NationRouter = require('./router/Nation')
app.use('/api/admin/nation', NationRouter)

//导入获取学院数据路由模块
const InstitutRouter = require('./router/Institut')
app.use('/api/admin/institut', InstitutRouter)

//导入获取专业数据路由模块
const SpecialtyRouter = require('./router/Specialty')
app.use('/api/admin/specialty', SpecialtyRouter)

//导入获取方案数据路由模块
const ProjectRouter = require('./router/Project')
app.use('/api/admin/project', ProjectRouter)

//导入获取课程数据路由模块
const TrainRouter = require('./router/Train')
app.use('/api/admin/train', TrainRouter)

//导入获取问题数据路由模块
const QuestionRouter = require('./router/Question')
app.use('/api/admin/question', QuestionRouter)

//导入获取新闻数据路由模块
const NewsRouter = require('./router/News')
app.use('/api/admin/news', NewsRouter)

//导入获取通告数据路由模块
const NoticeRouter = require('./router/Notice')
app.use('/api/admin/notice', NoticeRouter)

app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})
