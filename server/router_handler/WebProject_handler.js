const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
exports.getList = (req, res) => {
    const sql = 'select * from project_item where Deleted = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取方案列表数据成功',
            data: results,
        })
    })
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

exports.getDetail = async (req, res) => {
    console.log(req.query.Project_id)
    const sql = 'select * from project_item where Project_id = ?'
    db.query(sql, req.query.Project_id, (err, results) => {
        if (err) return res.cc(err)
        //解析bolb类型为string
        if (results[0].Project_content) {
            results[0].Project_content = decoder.write(results[0].Project_content)
        }
        res.send({
            status: 0,
            message: '获取方案列表数据成功',
            data: results[0],
        })
    })
}