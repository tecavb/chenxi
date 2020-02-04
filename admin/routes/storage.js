const express = require('express'),
    route = express.Router();
const {
    writeFile
} = require('../promiseFs')
route.get('/list', (req, res) => {//获取库存列表
    res.send({
        code: '0',
        data: req.storage
    })
})
route.get('/add', (req, res) => {//添加产品分类
    let {
        name,
        color,
        count,
        size,
        pri,
        pre
    } = req.query
    let data
    req.storage.forEach(item => {
        if (!item.id) {
            data = 0
        } else {
            data = item.id
        }
    })
    if (req.storage == 0) {
        data = 0
    }
    req.storage.push({
        "id": data + 1,
        "name": name,
        "color": color,
        "count": count,
        "size": size,
        "pri": pri,
        "pre": pre,
        "cho": true
    })
    writeFile('./json/storage.json', JSON.stringify(req.storage))
    res.send({
        code: '0'
    })
})
route.get('/change', (req, res) => {//入库，出库
    let {
        id,
        num,
        ac
    } = req.query
    let data = req.storage.map((item, index) => {
        if (id == index + 1 && ac == 'a') {
            item.count = item.count * 1 + num * 1
        }
        if (id == index + 1 && ac == 'c') {
            item.count = item.count - num < 0 ? 0 : item.count - num
        }
        return item
    });
    writeFile('./json/storage.json', JSON.stringify(data))
    res.send({
        code: '0'
    })
})
route.get('/cho', (req, res) => {//删除产品类型（可找回）
    let {
        id,
        cho
    } = req.query;
    if (cho == "false") {
        cho = false
    } else {
        cho = true
    }
    let data = req.storage.map(item => {
        if (id == item.id) {
            item.cho = cho
        }
        return item
    })
    writeFile('./json/storage.json', JSON.stringify(data))
    res.send({
        code: '0'
    })
})
route.post('/price', (req, res) => {//修改价格
    let {
        id,
        pri
    } = req.body
    let data = req.storage.map(item => {
        if (item.id == id) {
            item.pri = pri
        }
        return item
    })
    writeFile('./json/storage.json', JSON.stringify(data))
    res.send({
        code: '0',
        id: id,
        pri: pri
    })
})
module.exports = route;