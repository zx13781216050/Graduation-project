const db = require('../db/index')


exports.getDetail = async (req, res) => {

    const sql = "select User_id from web_user_item where username = ?"
    db.query(sql, req.body.username, (err, results) => {
        if (err) return res.cc(err)
        if (!results[0].User_id) return res.cc('未查询到用户ID')
        //res.cc('获取用户ID成功', 0)

        const sql = 'select * from customer_item where User_id = ?'
        db.query(sql, results[0].User_id, (err, results) => {
            if (err) return res.cc(err)
            if (!results[0].Customer_id) return res.cc('获取客户信息失败')
            res.send({ status: 0, message: '注册成功', data: results[0] })
        })
    })
}

// exports.editForm = async (req, res) => {

//     delete req.body.Customer_id;
//     if (!req.body.Target_specialty) {
//         delete req.body.Target_specialty;
//     }
//     const sql = 'insert into customer_item set ?'
//     db.query(sql, req.body, (err, results) => {
//         if (err) return res.cc(err)
//         if (results.affectedRows !== 1) return res.cc('添加客户信息失败')
//         res.cc('添加成功', 0)
//     })


// }
exports.editForm = async (req, res) => {
    if (req.body.Customer_id) {
        if (!req.body.Target_specialty) {
            delete req.body.Target_specialty;
        }
        const sql = 'update customer_item set ? where Customer_id =?'
        db.query(sql, [req.body, req.body.Customer_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新客户信息失败')
            res.cc('更新成功', 0)
        })
    } else {
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

}
