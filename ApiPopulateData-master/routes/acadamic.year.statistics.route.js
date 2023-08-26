const express = require('express');
const router = express.Router();
const AcadamicStat = require('../models/acadamic_year_statistics');
const Placement = require('../models/placement');

//get all placements
router.get('/acadamicyearstatistics',async (req,res)=>{
    const acadamicStat = await AcadamicStat.find();
    res.json(acadamicStat);
});

//get single placementStat
router.get('/acadamicyearstatistics/:id', getAcadamicStat, (req, res) => {
    res.json(res.acadamicStat);
});

router.post('/acadamicyearstatistics', async (req, res) => {
    const acadamicStat = new AcadamicStat({
        placement_id:req.body.placement_id,
        first_year_total_students_intake:req.body.first_year_total_students_intake,
        total_students_admitted:req.body.total_students_admitted,
        total_graduated_students:req.body.total_graduated_students,
        total_placed_students:req.body.total_placed_students,
        Total_student_gone_for_higher_studies:req.body.Total_student_gone_for_higher_studies,
        median_salary:req.body.median_salary,
        year:req.body.year,
    });
    try {
    const newAcadamicStat = await acadamicStat.save();
    await Placement.findByIdAndUpdate({_id:newAcadamicStat.placement_id},{'$push':{acadamic_year_statistics:newAcadamicStat._id}},{ useFindAndModify: false });
    res.status(201).json(newAcadamicStat);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
});
router.put('/acadamicyearstatistics/:id', getAcadamicStat,async (req, res) => {
    if(req.body.placement_id != null)
    {
        res.acadamicStat.placement_id = req.body.placement_id;
    }
    if(req.body.first_year_total_students_intake != null)
    {
        res.acadamicStat.first_year_total_students_intake = req.body.first_year_total_students_intake;
    }
    if(req.body.total_students_admitted != null)
    {
        res.acadamicStat.total_students_admitted = req.body.total_students_admitted;
    }
    if(req.body.total_graduated_students != null)
    {
        res.acadamicStat.total_graduated_students = req.body.total_graduated_students;
    }
    if(req.body.total_placed_students != null)
    {
        res.acadamicStat.total_placed_students = req.body.total_placed_students;
    }
    if(req.body.Total_student_gone_for_higher_studies != null)
    {
        res.acadamicStat.Total_student_gone_for_higher_studies = req.body.Total_student_gone_for_higher_studies;
    }
    if(req.body.median_salary != null)
    {
        res.acadamicStat.median_salary = req.body.median_salary;
    }
    if(req.body.year != null)
    {
        res.acadamicStat.year = req.body.year;
    }
    try 
    {
        const editAcadamicStat = await res.acadamicStat.save();
        res.json(editAcadamicStat);
    } 
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/acadamicyearstatistics/:id', getAcadamicStat, async (req, res) => {
    try {
      await res.acadamicStat.remove();
      res.json({ message: 'acadamicyearstatistics deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

async function getAcadamicStat(req, res, next) {
    try {
      const acadamicStat = await AcadamicStat.findById(req.params.id);
      if (acadamicStat == null) {
        return res.status(404).json({ message: 'Cannot find acadamicyearstatistics' });
      }
      res.acadamicStat = acadamicStat;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
} 

module.exports = router;