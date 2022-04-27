const db = require('../db/index')

exports.getList = (req, res) => {
    let sql = 'select * from role_item where Deleted = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        //判断是否分页查询
        if (req.query.page) {
            let total = results.length
            let newarr = results.splice((req.query.page - 1) * req.query.size, req.query.size)
            res.send({
                status: 0,
                message: '获取角色列表数据成功',
                data: newarr,
                total: total
            })
        } else {
            res.send({
                status: 0,
                message: '获取角色列表数据成功',
                data: results,

            })
        }

    })
}

exports.editForm = async (req, res) => {
    if (req.body.Role_id) {
        console.log('11')
        const sql = 'update role_item set ? where Role_id =?'
        db.query(sql, [req.body, req.body.Role_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        delete req.body.Role_id;
        const sql = 'insert into role_item set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('添加信息失败')
            res.cc('添加成功', 0)
        })
    }

}
