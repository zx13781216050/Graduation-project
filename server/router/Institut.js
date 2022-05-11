const express = require('express')
const router = express.Router()

const institut_handler = require('../router_handler/Institut_handler')

router.get('/get_list', institut_handler.getList)

router.get('/get_list/:Nation_id', institut_handler.getList)

router.put('/edit_form', institut_handler.editForm)

router.delete('/delete_form', institut_handler.deleteForm)

module.exports = router