const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const myMiddleWare = function(res,req,next) {
    console.log("I am a middleware");
    next();
}

app.get('/', myMiddleWare, function(req, res) {
    console.log("body", req.body);
    res.send('Hello Dostoo');
});


app.post('/postData', function(req, res) {
    console.log("bodyy", req.body);
    res.status(200).send('done');
})

//localhost:3000/queryData?msg=123456&name=vaibhav
app.post('/queryData', function(req, res) {
    console.log("bodyy", req.query);
    res.send('done');
})

app.listen(3000);