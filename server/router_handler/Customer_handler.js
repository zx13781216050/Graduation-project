const db = require('../db/index')

exports.getList = (req, res) => {
    const sql = 'select * from customer_item'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取客户列表数据成功',
            data: results,
        })
    })
}

exports.editForm = async (req, res) => {
    console.log(req.body.Customer_id)
    if (req.body.Customer_id) {
        console.log('1')
        const sql = 'update customer_item set ? where Customer_id =?'
        db.query(sql, [req.body, req.body.Customer_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新客户信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Customer_id;
        const sql = 'insert into customer_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加客户信息失败')
            res.cc('添加成功', 0)
        })
    }

}