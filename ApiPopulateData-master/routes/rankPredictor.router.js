const express = require('express');
const router = express.Router();
const Predicter = require('../utils/rank_predicter');

var cutoff;
var caste_group;
router.post('/rank-predicter',async(req,res)=>{
    if(req.body.cutoff != null)
    {
        cutoff = req.body.cutoff;
    }

    if(req.body.caste_group)
    {
        caste_group = req.body.caste_group;
    }

    res.json(await Predicter(cutoff,caste_group));
});


module.exports = router;

