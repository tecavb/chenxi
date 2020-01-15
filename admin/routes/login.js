const express = require('express'),
    route = express.Router();
const {
    writeFile
} = require('../promiseFs')
route.post('/login', (req, res) => {
    let {
        username,
        password,
        number,
        verify
    } = req.body
    let temp;
    if (verify != 'ver') {
        res.send({
            code: '11'
        })
        return
    }
    req.user.forEach(item => {
        if (item.name == username) {
            temp = 0
        }
    });
    if (temp == 0) {
        res.send({
            code: '00'
        })
        return
    }
    // req.user.forEach(item => {
    //     if (item.name == username) {
    //         res.send({
    //             code: '00'
    //         })
    //         return
    //     }
    // });
    let data = req.user;
    data.push({
        "name": username,
        "pass": password,
        "num": number
    })
    writeFile('./json/user.json', JSON.stringify(data))
    res.send({
        code: '0'
    })
})
route.post('/log', (req, res) => {
    let {
        username,
        password,
    } = req.body
    let temp;
    req.user.forEach(item => {
        if (item.name == username) {
            if (item.pass == password) {
                temp = 0
            }
        }
    });
    if (temp == 0) {
        let data = req.token;
        let token = 0;
        for (i of username) {
            token += i.charCodeAt()
        }
        token = token.toString(16) + Math.round(Math.random() * 100000)
        data.push({
            'token': token,
            'count': 0
        })
        writeFile('./json/token.json', JSON.stringify(data))
        res.send({
            code: '0',
            token: token
        })
        return
    }
    res.send({
        code: '1'
    })
})
route.post('/verify', (req, res) => {
    let {
        name
    } = req.body;
    let data = req.token,
        n = 0,
        temp;
    for (i of name) {
        n += i.charCodeAt()
    }
    n = n.toString(16)
    data.forEach(item => {
        if (item.token.includes(n)) {
            temp = 1
        }
    })
    if (temp == 1) {
        res.send({
            code: '1'
        })
        return
    }
    res.send({
        code: '0'
    })
})
route.post('/token', (req, res) => {
    let {
        token
    } = req.body;
    let data = req.token;
    let temp;
    data = data.map(item => {
        if (item.token == token) {
            item.count += 1
            temp = 0
        }
        return item
    });
    writeFile('./json/token.json', JSON.stringify(data))
    if (temp == 0) {
        res.send({
            code: '0'
        })
    } else {
        res.send({
            code: '1'
        })
    }
})
module.exports = route;