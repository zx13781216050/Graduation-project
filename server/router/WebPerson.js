const express = require('express')
const router = express.Router()

const webperson_handler = require('../router_handler/WebPerson_handler')
// 导入解析 formdata 格式表单数据的包
const multer = require('multer')
// 导入处理路径的核心模块
const path = require('path')
var storage = multer.diskStorage({
    // 文件存储的位置
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads');
    },
    // 文件重命名
    filename: function (req, file, cb) {
        console.log(file)
        let timeStamp = new Date().getTime()
        cb(null, timeStamp + '.' + file.originalname.split(".")[1]);
        // cb(null, file.fieldname + '.jpg');
    }
})
var upload = multer({ storage: storage })
// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
//const upload = multer({ dest: path.join(__dirname, '../uploads') })

router.post('/get_detail', webperson_handler.getDetail)

router.patch('/edit_form', upload.single('Customer_file'), webperson_handler.editForm)

module.exports = router