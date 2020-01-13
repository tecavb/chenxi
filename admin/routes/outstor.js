const express = require('express'),
    route = express.Router();
const {
    writeFile
} = require('../promiseFs')
route.get('/list', (req, res) => {
    res.send({
        code: '0',
        data: req.bysell
    })
})
route.get('/add', (req, res) => {
    let {
        name,
        fors,
        color,
        count,
        size,
        pri,
        pre
    } = req.query
    let data
    req.bysell.forEach(item => {
        if (!item.id) {
            data = 0
        } else {
            data = item.id
        }
    })
    if (req.bysell == 0) {
        data = 0
    }
    let date = new Date;
    let Date1 = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    req.bysell.push({
        "id": data + 1,
        "time":Date1,
        "for": fors,
        "name": name,
        "color": color,
        "count": count,
        "size": size,
        "pri": pri,
        "pre": pre
    })
    writeFile('./json/bysell.json', JSON.stringify(req.bysell))
    res.send({
        code: '0'
    })
})
module.exports = route;