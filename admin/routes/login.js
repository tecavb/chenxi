const express = require('express'),
    route = express.Router();
const {
    writeFile
} = require('../promiseFs')
route.post('/login', (req, res) => {//注册
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
        "num": number,
        'type': 3
    })
    writeFile('./json/user.json', JSON.stringify(data))
    res.send({
        code: '0'
    })
})
route.post('/log', (req, res) => {//登陆
    let {
        username,
        password,
    } = req.body
    let temp = 0;
    req.user.forEach(item => {
        if (item.name == username) {
            if (item.pass == password) {
                temp = item.type
            }
        }
    });
    if (temp != 0) {
        let data = req.token;
        let token = 0;
        for (i of username) {
            token += i.charCodeAt()
        }
        token = token.toString(16) + Math.round(Math.random() * 100000) + temp
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
// route.post('/verify', (req, res) => {//防止一个账号申请多个token，前端处理，单个设备不可多次登录
//     let {
//         name
//     } = req.body;
//     let data = req.token,
//         n = 0,
//         temp;
//     for (i of name) {
//         n += i.charCodeAt()
//     }
//     n = n.toString(16)
//     data.forEach(item => {
//         if (item.token.includes(n)) {
//             temp = 1
//         }
//     })
//     if (temp == 1) {
//         res.send({
//             code: '1'
//         })
//         return
//     }
//     res.send({
//         code: '0'
//     })
// })
route.post('/token', (req, res) => {//检验token是否相同，同时刷新token存活时间
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