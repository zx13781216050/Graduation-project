const db = require('../db/index')

exports.getList = (req, res) => {
    let sql
    if (req.params.institut_id == 'undefined') {
        if (!req.query.id && !req.query.name) {
            const sql = 'select * from specialty_item where Deleted = 0'
            db.query(sql, (err, results) => {
                if (err) return res.cc(err)
                //解析bolb类型为string
                for (var i = 0; i < results.length; i++) {
                    if (results[i].Specialty_content) {
                        results[i].Specialty_content = decoder.write(results[i].Specialty_content)
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
                        message: '获取方案列表数据成功',
                        data: newarr,
                        total: total
                    })
                } else {
                    res.send({
                        status: 0,
                        message: '获取方案列表数据成功',
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
            const sql = 'select * from specialty_item where Deleted = 0 and Specialty_id like ' + '"%' + req.query.id + '%" and Specialty_name like ' + '"%' + req.query.name + '%"'
            db.query(sql, (err, results) => {
                if (err) return res.cc(err)
                //解析bolb类型为string
                for (var i = 0; i < results.length; i++) {
                    if (results[i].Specialty_content) {
                        results[i].Specialty_content = decoder.write(results[i].Specialty_content)
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
                        message: '获取方案列表数据成功',
                        data: newarr,
                        total: total
                    })
                } else {
                    res.send({
                        status: 0,
                        message: '获取方案列表数据成功',
                        data: results,
                    })
                }
            })
        }
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