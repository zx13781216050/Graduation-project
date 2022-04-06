const express = require('express')
const router = express.Router()

const customer_handler = require('../router_handler/Customer_handler')

router.get('/get_list', customer_handler.getList)

module.exports = router