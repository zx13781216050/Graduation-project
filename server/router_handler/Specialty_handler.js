const db = require('../db/index')

exports.getList = (req, res) => {
    let sql
    if (!req.params.institut_id) {

        sql = 'select * from specialty_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '获取专业列表数据成功',
                data: results,
            })
        })
    } else {

        sql = 'select * from specialty_item where institut_id = ?'
        db.query(sql, req.params.institut_id, (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '获取专业列表数据成功',
                data: results,
            })
        })

    }

}