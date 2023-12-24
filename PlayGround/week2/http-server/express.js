const express = require('express');

const app = express();

app.get('/', function(req, res) {
    console.log("Someone is trying to access the homepage");
    res.send('Hello Dostoo');
});


app.post('/postData', function(req, res) {
    console.log(req.body);
    res.send('done');
})

app.listen(3000);