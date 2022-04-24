const db = require('../db/index')

exports.getList = (req, res) => {
    const sql = 'select * from train_item where Deleted = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取课程列表数据成功',
            data: results,
        })
    })
}

exports.editForm = async (req, res) => {
    if (req.body.Train_id) {
        console.log('11')
        const sql = 'update train_item set ? where Train_id =?'
        db.query(sql, [req.body, req.body.Train_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新课程信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Train_id;
        const sql = 'insert into train_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加课程信息失败')
            res.cc('添加成功', 0)
        })
    }

}

exports.deleteForm = async (req, res) => {
    console.log(req)
    const sql = 'update train_item set Deleted = 1 where train_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除课程数据成功',
            data: results,
        })
    })
}