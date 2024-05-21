const { Router } = require('express');
const isUserAthenticated = require('../middleware/userAuthMiddleware');
const { User, Account } = require('../db/db');
const { default: mongoose } = require('mongoose');

const router = Router();

router.get('/account/balance', isUserAthenticated, async (req, res) => {
    let accountBal = await Account.findOne({
        userId: req.userId
    }).select('balance _id');

    res.send({balance: accountBal.balance});
})

// from, to, amount, transaction (Session) 
// check if user is having sufficient balance, if benef user exists 
router.post('/account/transfer', isUserAthenticated, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    
    const { to, amount } = req.body;

    //checking if user is having sufficiemt balance or not
    const user = await Account.findOne({userId: req.userId}).session(session);

    
    if(user.balance < amount) {
        await session.abortTransaction();
        return res.status(400).send({message: 'Insufficient Balance'});
    }
    
    const toAccount = await Account.findOne({ userId: to }).session(session);
    

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    //debit money from User account
    await Account.updateOne({userId: req.userId},{
        $inc: {'balance': -amount}
    }).session(session);

    console.log('user', toAccount);

    
    // //credit money to the benef user
    await Account.updateOne({
        userId: to
    },{
        $inc: {'balance': amount}
    }).session(session);

    
// Commit the transaction
    await session.commitTransaction();
    res.json({
    message: "Transfer successful"
});
})

module.exports = router;