const express = require('express')
const router = express.Router()

const news_handler = require('../router_handler/News_handler')

router.get('/get_list', news_handler.getList)

router.put('/edit_form', news_handler.editForm)

router.delete('/delete_form', news_handler.deleteForm)

module.exports = router