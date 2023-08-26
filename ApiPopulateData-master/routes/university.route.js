
const express = require('express');
const router = express.Router();
const University = require('../models/university');
// get all universities
router.get('/universities', async (req, res) => {
    try {
      const universities = await University.find();
      res.json(universities);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // get a single university
  router.get('/universities/:id', getUniversity, (req, res) => {
    res.json(res.university);
  });
  
  // create a new university
  router.post('/university', async (req, res) => {
    const university = new University({
      college_type: req.body.college_type,
      university: req.body.university
    });

    try {
      const newUniversity = await university.save();
      res.status(201).json(newUniversity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // update an university
  router.put('/university/:id', getUniversity, async (req, res) => {
    if (req.body.college_type != null) {
      res.university.college_type = req.body.college_type;
    }
    if (req.body.university != null) {
        res.university.university = req.body.university;
      }
    try {
      const updatedUniversity = await res.university.save();
      res.json(updatedUniversity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // delete an university
  router.delete('/university/:id', getUniversity, async (req, res) => {
    try {
      await res.university.remove();
      res.json({ message: 'University deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getUniversity(req, res, next) {
    try {
      const university = await University.findById(req.params.id);
      if (university == null) {
        return res.status(404).json({ message: 'Cannot find university' });
      }
      res.university = university;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }  
  
  
  const universityRoute = router;
module.exports = universityRoute;

