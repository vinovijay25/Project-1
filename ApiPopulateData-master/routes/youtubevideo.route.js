const Youtubevideo = require('../models/youtubevideo');
const express = require('express');
const router = express.Router();

router.get('/youtubevideo', async (req, res) => 
{
    const catagory = await Youtubevideo.find();
    return res.json(catagory);

});

router.get('/youtubevideo/:id',getCatagory, async (req, res) => {
    return res.json(res.catagory);
});

router.post('/youtubevideo', async (req, res) => {
    const _catagory = new Youtubevideo({
        category:req.body.category,
        subcategory:req.body.subcategory,
        title:req.body.title,
        description:req.body.description,
        link:req.body.link,
    });
    try 
    {
        const newCatagory = await _catagory.save();
        res.status(200).json(newCatagory);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/Youtubevideo/:id',getCatagory,async(req,res)=>{
    if(req.body.category != null)
    {
        res.catagory.category = req.body.category;
    }if(req.body.subcategory != null)
    {
        res.catagory.subcategory = req.body.subcategory;
    }if(req.body.title != null)
    {
        res.catagory.title = req.body.title;
    }
    if(req.body.description != null)
    {
        res.catagory.description = req.body.description;
    }
    if(req.body.link != null)
    {
        res.catagory.link = req.body.link;
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

router.delete('/youtubevideo/:id',getCatagory,async(req,res)=>{
    try {
        await res.catagory.remove();
        res.json({ message: 'catagory deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

});


async function getCatagory(req, res, next) {
    try {
      const catagory = await Youtubevideo.findById(req.params.id);
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