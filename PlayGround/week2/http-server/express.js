const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
    console.log("Someone is trying to access the homepage");
    console.log("body", req.body);
    res.send('Hello Dostoo');
});


app.post('/postData', function(req, res) {
    console.log("bodyy", req.body);
    res.send('done');
})

//localhost:3000/queryData?msg=123456&name=vaibhav
app.post('/queryData', function(req, res) {
    console.log("bodyy", req.query);
    res.send('done');
})

app.listen(3000);