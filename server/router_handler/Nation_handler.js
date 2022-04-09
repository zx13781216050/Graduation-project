const db = require('../db/index')

exports.getList = (req, res) => {
    const sql = 'select * from nation_item'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取地区列表数据成功',
            data: results,
        })
    })
}