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