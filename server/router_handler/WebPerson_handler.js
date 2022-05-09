const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
// 导入处理路径的核心模块
const path = require('path')

exports.getDetail = async (req, res) => {
    const sql = "select User_id from web_user_item where username = ?"
    db.query(sql, req.body.username, (err, results) => {
        if (err) return res.cc(err)
        if (results[0] == 'undefined') return res.cc('未查询到用户ID')
        //res.cc('获取用户ID成功', 0)
        const sql = 'select * from customer_item where User_id = ?'
        db.query(sql, results[0].User_id, (err, results) => {
            if (err) return res.cc(err)
            if (!results[0]) return res.send({ status: 1, message: '无客户信息' })
            results[0].Customer_file = results[0].Customer_file.substring(results[0].Customer_file.lastIndexOf('\\') + 1);
            res.send({ status: 0, message: '获取客户信息成功', data: results[0] })
        })
    })
}

exports.editForm = async (req, res) => {
    if (req.body.Customer_id != 'null') {
        Object.keys(req.body).forEach((key) => {
            if (!req.body[key] || req.body[key] == 'null') {
                delete req.body[key]
            }
        });
        let customerInfo
        if (!req.file) {
            customerInfo = {
                // 标题、内容、状态、所属的分类Id
                ...req.body,
                // 文章封面在服务器端的存放路径
                Customer_file: path.join('/uploads', req.body.Customer_file),
            }
        } else {
            customerInfo = {
                // 标题、内容、状态、所属的分类Id
                ...req.body,
                // 文章封面在服务器端的存放路径
                Customer_file: path.join('/uploads', req.file.filename),
            }
        }
        const sql = 'update customer_item set ? where Customer_id =?'
        db.query(sql, [customerInfo, req.body.Customer_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新客户信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        Object.keys(req.body).forEach((key) => {
            if (!req.body[key]) {
                delete req.body[key]
            }
        });

        let customerInfo
        if (!req.file) {
            customerInfo = {
                // 标题、内容、状态、所属的分类Id
                ...req.body,
                // 文章封面在服务器端的存放路径
                Customer_file: path.join('/uploads', req.body.Customer_file),
            }
        } else {
            customerInfo = {
                // 标题、内容、状态、所属的分类Id
                ...req.body,
                // 文章封面在服务器端的存放路径
                Customer_file: path.join('/uploads', req.file.filename),
            }
        }
        console.log(customerInfo)
        const sql = 'insert into customer_item set ?'
        db.query(sql, customerInfo, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加客户信息失败')
            res.cc('添加成功', 0)
        })
    }

}
