const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
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

exports.getDetail = async (req, res) => {
    console.log(req.query.Institut_id)
    const sql = 'select * from institut_item where Institut_id = ?'
    db.query(sql, req.query.Institut_id, (err, results) => {
        if (err) return res.cc(err)
        //解析bolb类型为string
        if (results[0].Introduce) {
            results[0].Introduce = decoder.write(results[0].Introduce)
        }
        res.send({
            status: 0,
            message: '获取方案列表数据成功',
            data: results[0],
        })
    })
}
