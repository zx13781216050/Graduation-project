const express = require('express')
const router = express.Router()

const notice_handler = require('../router_handler/Notice_handler')

router.get('/get_list', notice_handler.getList)

router.put('/edit_form', notice_handler.editForm)

router.delete('/delete_form', notice_handler.deleteForm)

module.exports = router