const express = require('express')
const router = express.Router()

const question_handler = require('../router_handler/Question_handler')

router.get('/get_list', question_handler.getList)

router.put('/edit_form', question_handler.editForm)

router.delete('/delete_form', question_handler.deleteForm)

module.exports = router