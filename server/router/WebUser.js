const express = require('express')
const router = express.Router()

//导入用户路由处理函数模块
const userHandler = require('../router_handler/WebUser_handler')

const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')
//注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
//登录
router.post('/login', expressJoi(reg_login_schema), userHandler.login)

router.post('/quest', userHandler.quest)

router.get('/get_list', userHandler.getList)

router.get('get_choice', userHandler.getChoice)

module.exports = router