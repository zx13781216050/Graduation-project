const express = require('express')
const router = express.Router()

const webinstitut_handler = require('../router_handler/WebInstitut_handler')

router.get('/get_list', webinstitut_handler.getList)

router.get('/get_list/:Nation_id/:Customer_stage', webinstitut_handler.getList)

router.get('/get_detail', webinstitut_handler.getDetail)

module.exports = router