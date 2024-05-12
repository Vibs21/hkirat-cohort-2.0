const { Router } = require('express');

const router = Router();

router.get('/credit', (req, res) => {
    res.send({message: 'money creadit sccessfully'});
})

router.get('/debit', (req, res) => {
    res.send({message: 'money debited sccessfully'});
})

module.exports = router;