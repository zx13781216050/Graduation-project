const express = require('express')
const router = express.Router()

const download_handler = require('../router_handler/Download_handler')

router.post('/download/:Customer_file', download_handler.download)

module.exports = router