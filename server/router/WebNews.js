const express = require('express')
const router = express.Router()

const webnews_handler = require('../router_handler/WebNews_handler')

router.get('/get_list', webnews_handler.getList)

router.get('/get_detail', webnews_handler.getDetail)

module.exports = router