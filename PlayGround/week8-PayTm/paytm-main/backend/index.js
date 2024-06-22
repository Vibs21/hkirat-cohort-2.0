const express = require("express");
const userRouter = require('./routes/user')
const accoutRouter = require('./routes/account')
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//NOTE: Router MiddleWare
app.use('/api/v1/', userRouter);
app.use('/api/v1/', accoutRouter);
// app.use('api/v1', userRouter);

//OLD way of using Router
app.get('/', (req,res) =>{
    res.send('Hello World!');
})

app.listen(3000);