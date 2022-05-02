const fs = require('fs')
const http = require('http')
// 导入处理路径的核心模块
const path = require('path')
exports.download = (req, res) => {
    //获取请求URL
    var url = req.url;
    // 如果是下载文件的URL，则判断进行处理
    if (req.url.slice(0, 9) === '/download') {
        // 提取文件名hello.txt
        var name = url.substring(url.lastIndexOf('/') + 1);
        // 创建可读流，读取当前项目目录下的hello.txt文件
        var rs = fs.createReadStream(path.resolve(__dirname, '..') + "\\uploads\\" + name);
        console.log(name)
        //console.log(path.resolve(__dirname, '..') + "\\uploads\\" + name)
        // 设置响应请求头，200表示成功的状态码，headers表示设置的请求头
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Disposition': 'attachment; filename=' + name
        });
        rs.pipe(res).on('data', (data) => {
            res.write(data, 'binary')
        }).on('end', () => {
            res.end()
        });

    }

}