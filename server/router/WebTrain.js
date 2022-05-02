const express = require('express')
const router = express.Router()

const Webtrain_handler = require('../router_handler/WebTrain_handler')

router.get('/get_list', Webtrain_handler.getList)

router.put('/edit_form', Webtrain_handler.editForm)

router.delete('/delete_form', Webtrain_handler.deleteForm)

router.get('/get_detail', Webtrain_handler.getDetail)

module.exports = router