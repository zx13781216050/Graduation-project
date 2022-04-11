const express = require('express')
const router = express.Router()

const train_handler = require('../router_handler/Train_handler')

router.get('/get_list', train_handler.getList)

router.put('/edit_form', train_handler.editForm)

router.delete('/delete_form', train_handler.deleteForm)

module.exports = router