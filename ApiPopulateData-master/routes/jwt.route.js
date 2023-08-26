const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const secretKey = 'cac16934-aef3-49d3-8aa6-dc06cc2f8217';

router.post('/jwt-token',(req,res)=>{

    const payload = String(req.body.payload);
    const token = jwt.sign(payload, secretKey);
    res.json({token:token})
});

const _jwt = router;
module.exports = _jwt;