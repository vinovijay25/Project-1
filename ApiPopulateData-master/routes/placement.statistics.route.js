const express = require('express');
const router = express.Router();
const PlacementStat = require('../models/placement_statistics');
const Placement = require('../models/placement');

//get all placements
router.get('/placementstatistics',async (req,res)=>{
    const placementStat = await PlacementStat.find();
    res.json(placementStat);
});

//get single placementStat
router.get('/placementstatistics/:id', getPlacementStat, (req, res) => {
    res.json(res.placementStat);
});

router.post('/placementstatistics', async (req, res) => {
    const placementStat = new PlacementStat({
        placement_id:req.body.placement_id,
        total_number_of_offers:req.body.total_number_of_offers,
        number_of_companies_visited:req.body.number_of_companies_visited,
        number_of_students_placed:req.body.number_of_students_placed,
        number_of_super_dream_offers:req.body.number_of_super_dream_offers,
        number_of_dream_offers:req.body.number_of_dream_offers,
        average_salary_offered:req.body.average_salary_offered,
        year:req.body.year,
    });
    try {
    const newPlacementStat = await placementStat.save();
    await Placement.findByIdAndUpdate({_id:newPlacementStat.placement_id},{'$push':{placement_statistics:newPlacementStat._id}},{ useFindAndModify: false });
    res.status(201).json(newPlacementStat);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});
router.put('/placementstatistics/:id', getPlacementStat,async (req, res) => {
    if(req.body.placement_id != null)
    {
        res.placementStat.placement_id = req.body.placement_id;
    }
    if(req.body.total_number_of_offers != null)
    {
        res.placementStat.total_number_of_offers = req.body.total_number_of_offers;
    }
    if(req.body.number_of_companies_visited != null)
    {
        res.placementStat.number_of_companies_visited = req.body.number_of_companies_visited;
    }
    if(req.body.number_of_students_placed != null)
    {
        res.placementStat.number_of_students_placed = req.body.number_of_students_placed;
    }
    if(req.body.number_of_super_dream_offers != null)
    {
        res.placementStat.number_of_super_dream_offers = req.body.number_of_super_dream_offers;
    }
    if(req.body.number_of_dream_offers != null)
    {
        res.placementStat.number_of_dream_offers = req.body.number_of_dream_offers;
    }
    if(req.body.average_salary_offered != null)
    {
        res.placementStat.average_salary_offered = req.body.average_salary_offered;
    }
    if(req.body.year != null)
    {
        res.placementStat.year = req.body.year;
    }
    try 
    {
        const editPlacementStat = await res.placementStat.save();
        res.json(editPlacementStat);
    } 
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/placementstatistics/:id', getPlacementStat, async (req, res) => {
    try {
      await res.placementStat.remove();
      res.json({ message: 'placementstatistics deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getPlacementStat(req, res, next) {
    try {
      const placementStat = await PlacementStat.findById(req.params.id);
      if (placementStat == null) {
        return res.status(404).json({ message: 'Cannot find placementstatistics' });
      }
      res.placementStat = placementStat;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
} 

module.exports = router;