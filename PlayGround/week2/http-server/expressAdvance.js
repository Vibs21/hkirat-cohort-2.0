const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());


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

app.get('/', function(req, res) {
    console.log("body", req.body);
    res.send('Hello Dostoo');
});

app.post('/postData', function(req, res) {
    console.log("bodyy", req.body);
    /*
    * /users/123, req.params will have { userId: '123' }
    * - /search?keyword=express, req.query would be { keyword: 'express' }
    */
    res.status(200).send('done');
})


app.listen(3000);