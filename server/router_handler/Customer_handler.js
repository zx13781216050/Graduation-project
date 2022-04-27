const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
// 导入处理路径的核心模块
const path = require('path')
exports.getList = (req, res) => {
    const sql = 'select * from customer_item where Deleted = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)

        //解析bolb类型为string
        for (var i = 0; i < results.length; i++) {
            if (results[i].Customer_file) {
                results[i].Customer_file = results[i].Customer_file.substring(results[i].Customer_file.lastIndexOf('\\') + 1);
            }
        }
        //const url = URL.createObjectURL(blob);
        //console.log(results[2].Customer_file)
        res.send({
            status: 0,
            message: '获取客户列表数据成功',
            data: results,
        })
    })
}

exports.editForm = async (req, res) => {
    if (req.body.Customer_id) {
        if (!req.body.Target_specialty) {
            delete req.body.Target_specialty;
        }
        console.log(req.file)
        const customerInfo = {
            // 标题、内容、状态、所属的分类Id
            ...req.body,
            // 文章封面在服务器端的存放路径
            Customer_file: path.join('/uploads', req.file.filename),
        }
        const sql = 'update customer_item set ? where Customer_id =?'
        db.query(sql, [customerInfo, req.body.Customer_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新客户信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Customer_id;
        if (!req.body.Target_specialty) {
            delete req.body.Target_specialty;
        }
        const sql = 'insert into customer_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加客户信息失败')
            res.cc('添加成功', 0)
        })
    }

}

exports.deleteForm = async (req, res) => {
    console.log(req)
    const sql = 'update customer_item set Deleted = 1 where Customer_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除客户数据成功',
            data: results,
        })
    })
}