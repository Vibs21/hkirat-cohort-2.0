const { Router } = require('express');
const isUserAthenticated = require('../middleware/userAuthMiddleware');
const { User, Account } = require('../db/db');

const router = Router();

// from, to, amount, transaction (Session) 
router.get('/account/transfer', (req, res) => {
    res.send({message: 'money creadit sccessfully'});
})

router.get('/account/balance', isUserAthenticated, async (req, res) => {
    let accountBal = await Account.findOne({
        userId: req.userId
    }).select('balance _id');

    res.send({balance: accountBal.balance});
})

module.exports = router;