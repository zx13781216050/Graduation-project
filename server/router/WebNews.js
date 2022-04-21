const express = require('express')
const router = express.Router()

const webnews_handler = require('../router_handler/WebNews_handler')

router.get('/get_list', webnews_handler.getList)

router.put('/edit_form', webnews_handler.editForm)

router.delete('/delete_form', webnews_handler.deleteForm)

module.exports = router