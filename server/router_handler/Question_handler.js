const db = require('../db/index')

exports.getList = (req, res) => {
    const sql = 'select * from question_item where Deleted = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取问题列表数据成功',
            data: results,
        })
    })
}

exports.editForm = async (req, res) => {
    if (req.body.Question_id) {
        const sql = 'update question_item set ? where Question_id =?'
        db.query(sql, [req.body, req.body.Question_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新问题信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Question_id;
        const sql = 'insert into question_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加问题信息失败')
            res.cc('添加成功', 0)
        })
    }

}

exports.deleteForm = async (req, res) => {
    console.log(req)
    const sql = 'update question_item set Deleted = 1 where Question_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除问题数据成功',
            data: results,
        })
    })
}