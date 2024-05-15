const express = require("express");
const userRouter = require('./routes/user')
const transactionRouter = require('./routes/transactions')
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//NOTE: Router MiddleWare
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);
// app.use('api/v1', userRouter);

//OLD way of using Router
app.get('/', (req,res) =>{
    res.send('Hello World!');
})

app.listen(3000);