const express = require('express'),
    route = express.Router();
const {
    writeFile
} = require('../promiseFs')
route.get('/order', (req, res) => {
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
        "state": "正在处理",
        "goods": ary
    })
    writeFile('./json/order.json', JSON.stringify(req.order))
    res.send({
        code: '0'
    })
})
route.get('/list', (req, res) => {
    res.send({
        code: '0',
        data: req.order
    })
})
route.get('/dele', (req, res) => {
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