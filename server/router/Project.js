const express = require('express')
const router = express.Router()

const project_handler = require('../router_handler/Project_handler')

router.get('/get_list', project_handler.getList)

router.put('/edit_form', project_handler.editForm)

router.delete('/delete_form', project_handler.deleteForm)

module.exports = router