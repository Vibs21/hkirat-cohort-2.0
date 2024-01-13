const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
// app.use(express.json()); // we can use this as well


const someMiddleWare = function(req, res, next) {
    console.log('middle called');
    req.test = 'Hi from Middle ware';
    next();
}

app.get('/', someMiddleWare, function(req, res) {
    console.log("body", req.body);
    console.log("data from middleware", req.test);
    res.send('Hello Dostoo');
});


app.get('/auth', function(req,res) {
    const userName = req.headers.userName;
    const password = req.headers.password;
    const userId = req.headers.userId;

    if(userName != 'Vaibhav' && password != 'pass') {
        res.status(400).send({"msg":"Something is incorrectt!"})
        return
    }

    res.json({
        "msg": "You are now authenticated! Welcome!"
    })
})



app.post('/postData', function(req, res) {
    console.log("bodyy", req.body);
    /*
    * /users/123, req.params will have { userId: '123' }
    * - /search?keyword=express, req.query would be { keyword: 'express' }
    */
    res.status(200).send('done');
})


app.listen(3000);