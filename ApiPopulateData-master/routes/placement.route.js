const express = require('express');
const router = express.Router();
const Placement = require('../models/placement');

//get all placements
router.get('/placements',async (req,res)=>{
    try
    {
        if(req.query['_id'])
        {
            const filter = {overview_id:req.query['_id']};
            const placement = await Placement.findOne(filter)
            .populate('placement_statistics')
            .populate('acadamic_year_statistics');
            return res.json(placement);
        }
        else
        {
            const placement = await Placement.find()
            .populate('placement_statistics')
            .populate('acadamic_year_statistics');
            return res.json(placement);
        }
    }
    catch(err)
    {
        return res.json({message:err.message});
    }
});

//get single placement
router.get('/placements/:id', getPlacement, (req, res) => {
    res.json(res.placement);
});

router.post('/placements', async (req, res) => {
    const placement = new Placement({
        overview_id:req.body.overview_id,
        about:req.body.about,
        toprecruiters:req.body.toprecruiters,
    });
    try {
    const newPlacement = await placement.save();
    await Overview.findByIdAndUpdate({_id:college._id},{placement:req.body.overview_id});
    res.status(201).json(newPlacement);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});
router.put('/placements/:id', getPlacement,async (req, res) => {
    if(req.body.overview_id != null)
    {
        res.placement.overview_id = req.body.overview_id;
    }
    if(req.body.about != null)
    {
        res.placement.about = req.body.about;
    }
    if(req.body.toprecruiters != null)
    {
        res.placement.toprecruiters = req.body.toprecruiters;
    }
    try 
    {
        const editPlacement = await res.placement.save();
        res.json(editPlacement);
    } 
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/placements/:id', getPlacement, async (req, res) => {
    try {
      await res.placement.remove();
      res.json({ message: 'Placement deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getPlacement(req, res, next) {
    try {
      const placement = await Placement.findById(req.params.id)
      .populate('placement_statistics')
      .populate('acadamic_year_statistics');
      if (placement == null) {
        return res.status(404).json({ message: 'Cannot find placement' });
      }
      res.placement = placement;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
} 

module.exports = router;