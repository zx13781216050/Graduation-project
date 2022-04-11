const db = require('../db/index')

exports.getList = (req, res) => {
    const sql = 'select * from news_item where Deleted = 0'
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
    console.log(req.body)
    if (req.body.News_id) {
        const sql = 'update news_item set ? where News_id =?'
        db.query(sql, [req.body, req.body.News_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新方案信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.News_id;
        const sql = 'insert into news_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加方案信息失败')
            res.cc('添加成功', 0)
        })
    }

}

exports.deleteForm = async (req, res) => {
    const sql = 'update news_item set Deleted = 1 where News_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除方案数据成功',
            data: results,
        })
    })
}