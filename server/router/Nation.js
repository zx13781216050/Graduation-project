const express = require('express')
const router = express.Router()

const nation_handler = require('../router_handler/Nation_handler')

router.get('/get_list', nation_handler.getList)

module.exports = router