
const express = require('express');
const router = express.Router();
const Branch = require('../models/branch');
// get all branches
router.get('/branches', async (req, res) => {
    try {
      const branches = await Branch.find();
      res.json(branches);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // get a single branch
  router.get('/branches/:id', getBranch, (req, res) => {
    res.json(res.branch);
  });
  
  // create a new branch
  router.post('/branches', async (req, res) => {
    const branch = new Branch({
      university_type: req.body.university_type,
      branch: req.body.branch,
      branchcode: req.body.branchcode,
      degree: req.body.degree,
      level: req.body.level,
    });

    try {
      const newBranch = await branch.save();
      res.status(201).json(newBranch);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // update an branch
  router.put('/branches/:id', getBranch, async (req, res) => {
    if (req.body.university_type != null) {
      res.branch.university_type = req.body.university_type;
    }
    if (req.body.branch != null) {
      res.branch.branch = req.body.branch;
    }
    if (req.body.branchcode != null) {
      res.branch.branchcode = req.body.branchcode;
    }  
    if (req.body.degree != null) {
      res.branch.degree = req.body.degree;
    }
    if (req.body.level != null) {
      res.branch.level = req.body.level;
    }
    try {
      const updatedBranch = await res.branch.save();
      res.json(updatedBranch);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // delete an branch
  router.delete('/branches/:id', getBranch, async (req, res) => {
    try {
      await res.branch.remove();
      res.json({ message: 'Branch deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getBranch(req, res, next) {
    try {
      const branch = await Branch.findById(req.params.id);
      if (branch == null) {
        return res.status(404).json({ message: 'Cannot find branch' });
      }
      res.branch = branch;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }  
  
  
  const branchRoute = router;
module.exports = branchRoute;

