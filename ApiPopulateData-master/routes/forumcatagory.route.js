const ForumCatagory = require('../models/forum_catagory');
const express = require('express');
const router = express.Router();

router.get('/forum-catagorys', async (req, res) => 
{
    const catagory = await ForumCatagory.find();
    return res.json(catagory);

});

router.get('/forum-catagorys/:id',getCatagory, async (req, res) => {
    return res.json(res.catagory);
});

router.post('/forum-catagorys', async (req, res) => {
    const _catagory = new ForumCatagory({name:req.body.name});
    try 
    {
        const newCatagory = await _catagory.save();
        res.status(200).json(newCatagory);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/forum-catagorys/:id',getCatagory,async(req,res)=>{
    if(req.body.name != null)
    {
        res.catagory.name = req.body.name;
    }
    try
    {
        const editCatagory = await res.catagory.save();
        res.json(editCatagory);
    }
    catch(err)
    {
        res.json({message:err.message});
    }

});

router.delete('/forum-catagorys/:id',getCatagory,async(req,res)=>{
    try {
        await res.catagory.remove();
        res.json({ message: 'catagory deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

});


async function getCatagory(req, res, next) {
    try {
      const catagory = await ForumCatagory.findById(req.params.id);
      if (catagory == null) {
        return res.status(404).json({ message: 'Cannot find catagory' });
      }
      res.catagory = catagory;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
} 


module.exports = router;