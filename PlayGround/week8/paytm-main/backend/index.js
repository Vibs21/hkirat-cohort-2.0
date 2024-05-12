const express = require("express");
const userRouter = require('./routes/user')
const transactionRouter = require('./routes/transactions')

const app = express();

app.use(express.json());

//NOTE: Router MiddleWare
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);

//OLD way of using Router
app.get('/', (req,res) =>{
    res.send('Hello World!');
})

app.listen(3000);