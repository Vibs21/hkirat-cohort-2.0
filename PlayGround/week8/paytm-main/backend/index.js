const express = require("express");
const userRouter = require('./routes/user')
const transactionRouter = require('./routes/transactions')

const app = express();

app.use(express.json());


app.use('/user', userRouter);
app.use('/transaction', transactionRouter);

app.get('/', (req,res) =>{
    res.send('Hello World!');
})

app.listen(3000);