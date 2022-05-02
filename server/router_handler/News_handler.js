const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

exports.getList = (req, res) => {
    if (!req.query.id && !req.query.name) {
        const sql = 'select * from news_item where Deleted = 0'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            //解析bolb类型为string
            for (var i = 0; i < results.length; i++) {
                if (results[i].News_content) {
                    results[i].News_content = decoder.write(results[i].News_content)
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
        const sql = 'select * from news_item where Deleted = 0 and News_id like ' + '"%' + req.query.id + '%" and News_title like ' + '"%' + req.query.name + '%"'
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            //解析bolb类型为string
            for (var i = 0; i < results.length; i++) {
                if (results[i].News_content) {
                    results[i].News_content = decoder.write(results[i].News_content)
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