const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
// 导入处理路径的核心模块
const path = require('path')
exports.getList = (req, res) => {

    if (!req.query.id && !req.query.name) {
        const sql = 'select * from customer_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            //解析bolb类型为string
            for (var i = 0; i < results.length; i++) {
                if (results[i].Customer_file) {
                    results[i].Customer_file = results[i].Customer_file.substring(results[i].Customer_file.lastIndexOf('\\') + 1);
                }
            }
            if (req.query.page) {
                let total = results.length
                let newarr
                if (total > req.query.size) {
                    newarr = results.splice((req.query.page - 1) * req.query.size, req.query.size)
                } else {
                    newarr = results
                }
                res.send({
                    status: 0,
                    message: '获取客户列表数据成功',
                    data: newarr,
                    total: total
                })
            } else {
                res.send({
                    status: 0,
                    message: '获取客户列表数据成功',
                    data: results,
                })
            }
        })
    } else {
        if (!req.query.id) {
            req.query.id = ''
        }
        if (!req.query.name) {
            req.query.name = ''
        }
        const sql = 'select * from customer_item where Deleted = 0 and Customer_id like ' + '"%' + req.query.id + '%" and Customer_name like ' + '"%' + req.query.name + '%"'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            console.log(results)
            //解析bolb类型为string
            for (var i = 0; i < results.length; i++) {
                if (results[i].Customer_file) {
                    results[i].Customer_file = results[i].Customer_file.substring(results[i].Customer_file.lastIndexOf('\\') + 1);
                }
            }
            if (req.query.page) {
                let total = results.length
                let newarr
                if (total > req.query.size) {
                    newarr = results.splice((req.query.page - 1) * req.query.size, req.query.size)
                } else {
                    newarr = results
                }
                res.send({
                    status: 0,
                    message: '获取客户列表数据成功',
                    data: newarr,
                    total: total
                })
            } else {
                res.send({
                    status: 0,
                    message: '获取客户列表数据成功',
                    data: results,
                })
            }
        })
    }

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
            if (!req.body[key] || req.body[key] == 'null') {
                delete req.body[key]
            }
        });
        if (!req.body.Target_specialty) {
            delete req.body.Target_specialty;
        }

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

exports.choice = async (req, res) => {
    const sql = 'select * from institut_item '
}