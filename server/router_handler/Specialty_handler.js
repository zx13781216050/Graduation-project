const db = require('../db/index')

exports.getList = (req, res) => {
    let sql
    if (!req.params.specialty_id) {

        sql = 'select * from specialty_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            if (req.query.page) {
                let total = results.length
                let newarr = results.splice((req.query.page - 1) * req.query.size, req.query.size)
                res.send({
                    status: 0,
                    message: '获取专业列表数据成功',
                    data: newarr,
                    total: total
                })
            } else {
                res.send({
                    status: 0,
                    message: '获取专业列表数据成功',
                    data: results,

                })
            }

        })
    } else {

        sql = 'select * from specialty_item where specialty_id = ?'
        db.query(sql, req.params.specialty_id, (err, results) => {
            if (err) return res.cc(err)
            res.send({
                status: 0,
                message: '获取专业列表数据成功',
                data: results,
            })
        })

    }

}

exports.editForm = async (req, res) => {
    if (req.body.Specialty_id) {
        const sql = 'update specialty_item set ? where Specialty_id =?'
        db.query(sql, [req.body, req.body.Specialty_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新专业信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Specialty_id;
        const sql = 'insert into specialty_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加专业信息失败')
            res.cc('添加成功', 0)
        })
    }

}


exports.deleteForm = async (req, res) => {
    console.log(req)
    const sql = 'update specialty_item set Deleted = 1 where Specialty_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除专业数据成功',
            data: results,
        })
    })
}