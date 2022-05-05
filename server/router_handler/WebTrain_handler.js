const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
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

exports.getDetail = async (req, res) => {
    console.log(req.query)
    const sql = 'select * from train_item where Train_id = ?'
    db.query(sql, req.query.Train_id, (err, results) => {
        if (err) return res.cc(err)
        //解析bolb类型为string
        if (results[0].Train_content) {
            results[0].Train_content = decoder.write(results[0].Train_content)
        }
        res.send({
            status: 0,
            message: '获取课程列表数据成功',
            data: results[0],
        })
    })
}

exports.signUp = async (req, res) => {
    if (req.body.User_id == undefined) {
        return res.send({ status: 1, message: '请先登录', })
    } else {
        const sql = 'select * from customer_item where User_id = ?'
        db.query(sql, req.body.User_id, (err, results) => {
            if (results == []) return res.send({ status: 1, message: '请先完善个人信息', })
            if (results[0].Train_id) {
                results[0].Train_id = results[0].Train_id.split(",");
                //转为数字
                results[0].Train_id = results[0].Train_id.map(function (val, index, arr) {
                    return val - 0;
                });
                if (results[0].Train_id.includes(Number(req.body.Train_id))) return res.send({ status: 1, message: '重复报名', })
                req.body.Train_id = results[0].Train_id + ',' + req.body.Train_id
            }
            console.log(req.body.Train_id)
            const sql = 'update customer_item set Train_id = ? where User_id = ?'
            db.query(sql, [req.body.Train_id, req.body.User_id], (err, results) => {
                res.send({
                    status: 0,
                    message: '报名成功',
                })
            })
        })
    }


}