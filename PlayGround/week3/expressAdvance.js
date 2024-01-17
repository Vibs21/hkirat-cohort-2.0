const express = require('express');
const bodyParser = require('body-parser');
const zod = require('zod');

const app = express();
app.use(bodyParser.json());

const loginSchema = zod.object({
    username: zod.string(),
    password: zod.string()
})

const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(3),
    country: zod.literal("IN").or(zod.literal("US")),
    age: zod.number().refine((num) => num > 18, {
        message: 'age should be greater then 18',
      })
})

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    try {
      loginSchema.parse({ username, password });
      console.log('heya your user is authenticated!')
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: 'Invalid input.', details: error.errors });
    }
});

app.post('/login2', (req, res) => {
    const { email, password, country, age } = req.body;
    try {
        const result = schema.safeParse({ email, password, country, age }); //safeParse, 200, send error msg on obj
        console.log('heya your user is authenticated!')
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: 'Invalid input.', details: error.errors });
    }
});


app.get('/auth', function(req,res) {
    const userName = req.headers.userName;
    const password = req.headers.password;
    if(userName != 'Vaibhav' && password != 'pass') {
        res.status(400).send({"msg":"Something is incorrectt!"})
        return
    }
    res.json({
        "msg": "You are now authenticated! Welcome!"
    })
})


app.listen(3000);