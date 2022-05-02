const express = require('express')
const router = express.Router()

const webdownload_handler = require('../router_handler/WebDownload_handler')

router.post('/download/:Customer_file', webdownload_handler.download)

module.exports = router