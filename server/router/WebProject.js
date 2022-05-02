const express = require('express')
const router = express.Router()

const webproject_handler = require('../router_handler/WebProject_handler')

router.get('/get_list', webproject_handler.getList)

router.put('/edit_form', webproject_handler.editForm)

router.delete('/delete_form', webproject_handler.deleteForm)

router.get('/get_detail', webproject_handler.getDetail)

module.exports = router