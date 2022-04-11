const express = require('express')
const router = express.Router()

const institut_handler = require('../router_handler/Institut_handler')

router.get('/get_list', institut_handler.getList)

router.get('/get_list/:Nation_id/:Customer_stage', institut_handler.getList)

module.exports = router