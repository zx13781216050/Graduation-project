const express = require('express')
const router = express.Router()

const specialty_handler = require('../router_handler/Specialty_handler')

router.get('/get_list', specialty_handler.getList)

router.get('/get_list/:institut_id', specialty_handler.getList)

router.put('/edit_form', specialty_handler.editForm)

router.delete('/delete_form', specialty_handler.deleteForm)

module.exports = router