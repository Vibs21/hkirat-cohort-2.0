const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json());
app.use(express.json()); // we can use this as well

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
    /*
    * /users/123, req.params will have { userId: '123' }
    * - /search?keyword=express, req.query would be { keyword: 'express' }
    */
    res.status(200).send('done');
})

//localhost:3000/queryData?msg=123456&name=vaibhav
app.post('/queryData', function(req, res) {
    console.log("bodyy", req.query);
    res.send('done');
})

app.get('/error', function(req,res,next) {
    console.log('error route');
    const err = new Error('This is an intentional error');
    next(err);
})

const errorHandler = (err,req,res,next) => {
    console.log('err', err.stack);
    res.status(500).send('Something went wrong!')
}

app.use(errorHandler);

app.listen(3000);