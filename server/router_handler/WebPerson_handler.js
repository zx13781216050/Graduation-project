const db = require('../db/index')


exports.editForm = async (req, res) => {

    delete req.body.Customer_id;
    if (!req.body.Target_specialty) {
        delete req.body.Target_specialty;
    }
    const sql = 'insert into customer_item set ?'
    db.query(sql, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加客户信息失败')
        res.cc('添加成功', 0)
    })


}

