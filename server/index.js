//导入express
const express = require('express')
const app = express()
const fs = require('fs')
const http = require('http')
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
app.use('/api/admin/user', userRouter)

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

// 托管静态资源文件
const DownloadRouter = require('./router/Download')
app.use('/api/admin', DownloadRouter)

// 托管静态资源文件
const RoleRouter = require('./router/Role')
app.use('/api/admin/role', RoleRouter)

//导入前台用户提交数据路由模块
const WebPersonRouter = require('./router/WebPerson')
app.use('/api/web/webperson', WebPersonRouter)

//导入前台获取地区数据路由模块
const WebNationRouter = require('./router/WebNation')
app.use('/api/web/webnation', WebNationRouter)

//导入前台获取学院数据路由模块
const WebInstitutRouter = require('./router/WebInstitut')
app.use('/api/web/webinstitut', WebInstitutRouter)

//导入前台获取专业数据路由模块
const WebSpecialtyRouter = require('./router/WebSpecialty')
app.use('/api/web/webspecialty', WebSpecialtyRouter)

//导入前台用户登录数据路由模块
const WebUserRouter = require('./router/WebUser')
app.use('/api/web/webuser', WebUserRouter)

//导入前台获取新闻数据路由模块
const WebNewsRouter = require('./router/WebNews')
app.use('/api/web/webnews', WebNewsRouter)

//导入前台获取课程数据路由模块
const WebTrainRouter = require('./router/WebTrain')
app.use('/api/web/webtrain', WebTrainRouter)

//导入前台获取留学方案数据路由模块
const WebProjectRouter = require('./router/WebProject')
app.use('/api/web/webproject', WebProjectRouter)

// 托管静态资源文件
const WebDownloadRouter = require('./router/WebDownload')
app.use('/api/web', WebDownloadRouter)

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))


app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007')
})
