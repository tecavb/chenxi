const express = require('express'),
    route = express.Router();
const {
    writeFile
} = require('../promiseFs')
route.post('/token', (req, res) => {
    let {
        token
    } = req.body;
    let data = req.token;
    data = data.map(item => {
        if (item.token == token) {
            item.count += 1
        }
        return item
    });
    writeFile('./json/token.json', JSON.stringify(data))
    res.send({
        code: 0
    })
})
module.exports = route;