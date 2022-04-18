const db = require('../db/index')

exports.getList = (req, res) => {
    let sql
    if (!req.params.Nation_id) {
        sql = 'select * from institut_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '获取学院列表数据成功',
                data: results,
            })

        })

    } else {

        sql = 'select * from institut_item where Nation_id = ? and Stage_id = ?'
        db.query(sql, [req.params.Nation_id, req.params.Customer_stage], (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '获取学院列表数据成功',
                data: results,
            })
        })
    }




}
