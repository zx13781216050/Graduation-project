const db = require('../db/index')
const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const config = require('../config')
//注册用户的处理函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    // if (!userinfo.username || !userinfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不合法' })
    // }

    //定义SQL语句
    const sqlStr = 'select * from ev_user where username = ?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            //return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        if (results.length > 0) {
            //return res.send({ status: 1, message: '用户名被占用,请更换其他用户名' })
            return res.cc('用户名被占用,请更换其他用户名')
        }
        var salt = bcrypt.genSaltSync(10);
        userinfo.password = bcrypt.hashSync(userinfo.password, salt)

        const sql = 'insert into User_item set ?'

        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            //if (err) return res.send({ status: 1, message: err.message })
            if (err) return res.cc(err)
            //if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
            //res.send({ status: 0, message: '注册成功' })
            res.cc('注册成功')
        })
    })



}
//登录的处理函数
exports.login = async (req, res) => {
    const userinfo = req.body

    const sql = 'select * from User_item where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败')
        console.log(results[0].password)
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)

        if (!compareResult) return res.cc('登录失败')

        //const user = { ...results[0], password: '', user_pic: '' }
        const user = { ...results[0], password: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })

        res.send({
            status: 0,
            message: '登陆成功',
            username: userinfo.username,
            token: 'Bearer' + tokenStr
        })
    })

}

exports.getList = (req, res) => {

    if (!req.query.id && !req.query.name) {
        let sql
        sql = 'select * from user_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            if (req.query.page) {
                let total = results.length
                let newarr = results.splice((req.query.page - 1) * req.query.size, req.query.size)
                res.send({
                    status: 0,
                    message: '获取学院列表数据成功',
                    data: newarr,
                    total: total
                })
            } else {
                res.send({
                    status: 0,
                    message: '获取学院列表数据成功',
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
        const sql = 'select * from user_item where Deleted = 0 and User_id like ' + '"%' + req.query.id + '%" and Real_name like ' + '"%' + req.query.name + '%"'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            if (req.query.page) {
                let total = results.length
                let newarr = results.splice((req.query.page - 1) * req.query.size, req.query.size)
                res.send({
                    status: 0,
                    message: '获取学院列表数据成功',
                    data: newarr,
                    total: total
                })
            } else {
                res.send({
                    status: 0,
                    message: '获取学院列表数据成功',
                    data: results,
                })
            }
        })
    }
}

exports.editForm = async (req, res) => {
    if (req.body.User_id) {
        const sql = 'update user_item set ? where User_id =?'
        db.query(sql, [req.body, req.body.User_id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新用户信息失败')
            res.cc('更新成功', 0)
        })
    } else {
        const userinfo = req.body
        if (!userinfo.username || !userinfo.password) {
            return res.send({ status: 1, message: '用户名或密码不合法' })
        }

        //定义SQL语句
        const sqlStr = 'select * from user_item where username = ?'
        db.query(sqlStr, userinfo.username, (err, results) => {
            if (err) {
                return res.send({ status: 1, message: err.message })
                //return res.cc(err)
            }
            if (results.length > 0) {
                return res.send({ status: 1, message: '用户名被占用,请更换其他用户名' })
                //return res.cc('用户名被占用,请更换其他用户名')
            }
            userinfo.password = bcrypt.hashSync(userinfo.password, 10)
            console.log(userinfo)
            const sql = 'insert into user_item set ?'
            delete req.body.User_id;
            db.query(sql, userinfo, (err, results) => {
                if (err) return res.send({ status: 1, message: err.message })
                //if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.send({ status: 1, message: '注册用户失败，请稍后再试' })
                //if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
                res.send({ status: 0, message: '注册成功' })
                //res.cc('注册成功')
            })
        })
    }

}

exports.deleteForm = async (req, res) => {
    console.log(req.query.id)
    const sql = 'update user_item set Deleted = 1 where User_id =?'
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '删除用户数据成功',
            data: results,
        })
    })
}

exports.userInfo = (req, res) => {
    let token = req.headers.authorization.replace('Bearer', '')
    let verifyToken = jwt.verify(token, config.jwtSecretKey)
    console.log(verifyToken)
    let sql = "select Role_name from role_item where Role_id = ?"
    let results
    db.query(sql, verifyToken.Role_id, (err, res2) => {
        if (err) return res.cc(err)
        results = res2[0].Role_name
        verifyToken.Role_name = results
        res.send({
            status: 0,
            message: '获取用户数据成功',
            data: verifyToken,
        })
    })


}