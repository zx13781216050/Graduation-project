const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
exports.getList = (req, res) => {
    if (!req.query.id && !req.query.name) {
        const sql = 'select * from project_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            //解析bolb类型为string
            for (var i = 0; i < results.length; i++) {
                if (results[i].Project_content) {
                    results[i].Project_content = decoder.write(results[i].Project_content)
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
        const sql = 'select * from project_item where Deleted = 0 and Project_id like ' + '"%' + req.query.id + '%" and Project_name like ' + '"%' + req.query.name + '%"'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            //解析bolb类型为string
            for (var i = 0; i < results.length; i++) {
                if (results[i].Project_content) {
                    results[i].Project_content = decoder.write(results[i].Project_content)
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
}

exports.editForm = async (req, res) => {
    if (req.body.Project_id) {
        console.log('11')
        const sql = 'update project_item set ? where Project_id =?'
        db.query(sql, [req.body, req.body.Project_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新方案信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Project_id;
        const sql = 'insert into project_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加方案信息失败')
            res.cc('添加成功', 0)
        })
    }

}

exports.deleteForm = async (req, res) => {
    console.log(req)
    const sql = 'update project_item set Deleted = 1 where Project_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除方案数据成功',
            data: results,
        })
    })
}