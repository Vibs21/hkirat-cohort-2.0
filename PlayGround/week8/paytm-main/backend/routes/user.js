const { Router } = require("express");

const router = Router();

//NOTE: Router acts as a bridge to abstract the logic from the main index.js file to this and transactions file

router.get('/signup', (req, res)=>{
    res.send({message: 'user singup successfully'})
})


router.get('/login', (req, res)=>{
    res.json({message: 'user login successfully'})
})


module.exports = router;
