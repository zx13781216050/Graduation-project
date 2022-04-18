const express = require('express')
const router = express.Router()

const person_handler = require('../router_handler/WebPerson_handler')

router.put('/edit_form', person_handler.editForm)

module.exports = router