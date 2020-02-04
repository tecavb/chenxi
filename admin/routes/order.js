const express = require('express'),
    route = express.Router();
const {
    writeFile
} = require('../promiseFs')
route.get('/order', (req, res) => { //添加订单
    let {
        ary,
        fors
    } = req.query
    let data
    req.order.forEach(item => {
        if (!item.id) {
            data = 0
        } else {
            data = item.id
        }
    })
    if (req.order == 0) {
        data = 0
    }
    let date = new Date;
    let Date1 = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    req.order.push({
        "id": data + 1,
        "time": Date1,
        "for": fors,
        "state": "等待处理",
        "goods": ary
    })
    writeFile('./json/order.json', JSON.stringify(req.order))
    res.send({
        code: '0'
    })
})
route.get('/list', (req, res) => { //获取订单列表
    res.send({
        code: '0',
        data: req.order
    })
})
route.post('/state', (req, res) => { //改变订单状态
    let {
        id,
        state
    } = req.body
    req.order.forEach(item => {
        if (item.id == id) {
            item.state = state
        }
    })
    writeFile('./json/order.json', JSON.stringify(req.order))
    res.send({
        code: '0',
        data: req.order
    })
})
route.get('/dele', (req, res) => { //删除列表
    let {
        id
    } = req.query;
    req.order.forEach((item, index) => {
        if (item.id == id) {
            req.order.splice(index, 1)
        }
    })
    writeFile('./json/order.json', JSON.stringify(req.order))
    res.send({
        code: '0'
    })
})
module.exports = route;