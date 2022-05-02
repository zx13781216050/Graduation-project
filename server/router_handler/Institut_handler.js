const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
exports.getList = (req, res) => {
    let sql
    if (!req.params.Nation_id) {
        sql = 'select * from institut_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            //解析bolb类型为string
            for (var i = 0; i < results.length; i++) {
                if (results[i].Introduce) {
                    results[i].Introduce = decoder.write(results[i].Introduce)
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
                    message: '获取学院列表数据成功',
                    data: newarr,
                    total: total
                })
            } else {
                res.send({
                    status: 0,
                    message: '获取学院列表数据成功',
                    data: results,
                })
            }

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

exports.editForm = async (req, res) => {
    if (req.body.Institut_id) {
        const sql = 'update institut_item set ? where Institut_id =?'
        db.query(sql, [req.body, req.body.Institut_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新学院信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Institut_id;
        const sql = 'insert into institut_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加学院信息失败')
            res.cc('添加成功', 0)
        })
    }

}


exports.deleteForm = async (req, res) => {
    console.log(req)
    const sql = 'update institut_item set Deleted = 1 where Institut_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除学院数据成功',
            data: results,
        })
    })
}