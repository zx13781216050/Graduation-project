const express = require('express')
const router = express.Router()

const customer_handler = require('../router_handler/Customer_handler')

router.get('/get_list', customer_handler.getList)

router.put('/edit_form', customer_handler.editForm)

module.exports = router