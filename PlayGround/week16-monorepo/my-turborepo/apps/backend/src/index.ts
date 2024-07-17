import express from "express";
import {VALUE} from "@repo/common/url"; //the last name in match with the export name

const app = express();

app.get('/', (req, res)=> {
    
    res.json({msg: `Hello World!, ${VALUE}`});
});


app.listen(3002);