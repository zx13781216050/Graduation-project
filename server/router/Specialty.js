const express = require('express')
const router = express.Router()

const specialty_handler = require('../router_handler/Specialty_handler')

router.get('/get_list', specialty_handler.getList)

router.get('/get_list/:institut_id', specialty_handler.getList)

module.exports = router