const express = require('express')
const router = express.Router()

const webspecialty_handler = require('../router_handler/WebSpecialty_handler')

router.get('/get_list', webspecialty_handler.getList)

router.get('/get_list/:institut_id', webspecialty_handler.getList)

module.exports = router