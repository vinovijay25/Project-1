const express = require('express');
const router = express.Router();
const Predicter = require('../utils/tneaPredicter');


var type;
var tnea_rank;
var course_Fee_structure;
var caste_group;
var sub_caste;
router.post('/tnea-predictor',async(req,res)=>{

    if(req.body.type != null)
    {
        type = req.body.type;
    }
    if(req.body.tnea_rank != null)
    {
        tnea_rank = req.body.tnea_rank;
    }
    if(req.body.course_Fee_structure)
    {
        course_Fee_structure = req.body.course_Fee_structure;
    }
    if(req.body.caste_group)
    {
        caste_group = req.body.caste_group;
        if(caste_group == 'BC' || caste_group == 'SC')
        {
            if(req.body.sub_caste)
            {
                sub_caste = req.body.sub_caste;
            }
        }
    }

    res.json(await Predicter(type,tnea_rank,course_Fee_structure,caste_group,sub_caste));
});

module.exports = router;

