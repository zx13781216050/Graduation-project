const express = require('express')
const router = express.Router()

const role_handler = require('../router_handler/Role_handler')

router.get('/get_list', role_handler.getList)

router.put('/edit_form', role_handler.editForm)

module.exports = router