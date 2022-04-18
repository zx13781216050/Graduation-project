const express = require('express')
const router = express.Router()

const webnation_handler = require('../router_handler/WebNation_handler')

router.get('/get_list', webnation_handler.getList)

module.exports = router