const express = require('express'),
    app = express();
const qs = require('qs')
const {
    readFile,
    writeFile
} = require('./promiseFs')
app.listen(8080, () => {
    console.log(`当前服务 起于8080端口`);
});
let Data;
readFile('json/token.json').then(data => {
    Data = JSON.parse(data)
})
setInterval(() => {
    readFile('json/token.json').then(data => {
        data = JSON.parse(data)
        Data.forEach(D => {
            data.forEach((d, i) => {
                if (d.token == D.token) {
                    if (d.count == D.count) {
                        data.splice(i, 1)
                    }
                }
            })
        });
        writeFile('./json/token.json', JSON.stringify(data))
        Data = data;
    })
}, 4000000)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://192.168.68.137:8081')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', "Content-Type,X-Agent,X-Token,X-Legacy-Token,X-Legacy-Uid,X-Legacy-Device-Id,X-Legacy-New-Token,X-Request-Id")
    req.method == 'OPTIONS' ? res.send('OK') : next();
})
app.use((req, res, next) => {
    readFile('json/storage.json').then((data) => {
        req.storage = JSON.parse(data) || []
        next()
    }).catch((err) => {
        res.status(500);
        res.send('');
    })
})
app.use((req, res, next) => {
    readFile('json/user.json').then((data) => {
        req.user = JSON.parse(data) || []
        next()
    }).catch((err) => {
        res.status(500);
        res.send('');
    })
})
app.use((req, res, next) => {
    readFile('json/token.json').then((data) => {
        req.token = JSON.parse(data) || []
        next()
    }).catch((err) => {
        res.status(500);
        res.send('');
    })
})
app.use((req, res, next) => {
    readFile('json/bysell.json').then((data) => {
        req.bysell = JSON.parse(data) || []
        next()
    }).catch((err) => {
        res.status(500);
        res.send('');
    })
})
app.use((req, res, next) => {
    readFile('json/order.json').then((data) => {
        req.order = JSON.parse(data) || []
        next()
    }).catch((err) => {
        res.status(500);
        res.send('');
    })
})
app.use((req, res, next) => {
    let str = '';
    req.on('data', (chunk) => {
        str += chunk;
    })
    req.on('end', () => {
        let obj = {};
        try {
            obj = JSON.parse(str)
        } catch (error) {
            obj = qs.parse(str)
        }
        req.body = obj;
        next();
    })
})
app.use('/storage', require('./routes/storage'));
app.use('/order', require('./routes/order'));
app.use('/outstor', require('./routes/outstor'));
app.use('/login', require('./routes/login'));
app.use((req, res) => {
    res.status(404);
    res.send('NOT FOUND!');
});
// app.get('/storage',(req,res)=>{
//     res.send({
//         code:'0',
//         data:req.storage
//     })
// })