const db = require('../db/index')
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

exports.getList = (req, res) => {
    const sql = 'select * from news_item where Deleted = 0'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)

        //解析bolb类型为string
        for (var i = 0; i < results.length; i++) {
            if (results[i].News_content) {
                results[i].News_content = decoder.write(results[i].News_content)
            }
        }
        res.send({
            status: 0,
            message: '获取方案列表数据成功',
            data: results,
        })
    })
}

exports.getDetail = async (req, res) => {

    const sql = 'select * from news_item where News_id = ?'
    db.query(sql, req.query.News_id, (err, results) => {
        if (err) return res.cc(err)

        //解析bolb类型为string
        for (var i = 0; i < results.length; i++) {
            if (results[i].News_content) {
                results[i].News_content = decoder.write(results[i].News_content)
            }
        }
        res.send({
            status: 0,
            message: '获取方案列表数据成功',
            data: results[0],
        })
    })
}

