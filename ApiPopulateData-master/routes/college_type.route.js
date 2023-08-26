
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const College_type = require('../models/college_type');


function writeToCollegeTypeFile(collegeType) {
  const uploadsDir = path.join(__dirname, '..', 'uploads');
  const filePath = path.join(uploadsDir, `${collegeType._id}.txt`);

  try {
    fs.writeFileSync(filePath, collegeType.college_type_name, 'utf-8');
    console.log(`College type data for ID ${collegeType._id} written to file.`);
  } catch (err) {
    console.error(`Error writing college type data for ID ${collegeType._id} to file:`, err);
  }
}

// get all college_types
router.get('/college_types', async (req, res) => {
    try {
      const college_types = await College_type.find();
      res.json(college_types);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // get a single college_type
  router.get('/college_types/:id', getCollege_type, (req, res) => {
    res.json(res.college_type);
  });
  
// create a new college_type
router.post('/college_type', async (req, res) => {
  const college_type = new College_type({
    college_type_name: req.body.college_type_name,
  });

  try {
    const newCollege_type = await college_type.save();

    // Write the college type data to an individual text file
    writeToCollegeTypeFile(newCollege_type);

    res.status(201).json(newCollege_type);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update an college_type
router.put('/college_type/:id', getCollege_type, async (req, res) => {
  if (req.body.college_type_name != null) {
    res.college_type.college_type_name = req.body.college_type_name;
  }
  try {
    const updatedCollege_type = await res.college_type.save();

    // Write the updated college type data to the individual text file
    writeToCollegeTypeFile(updatedCollege_type);

    res.json(updatedCollege_type);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


  // delete an college_type
  router.delete('/college_type/:id', getCollege_type, async (req, res) => {
    try {
      await res.college_type.remove();
      res.json({ message: 'College_type deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getCollege_type(req, res, next) {
    try {
      const college_type = await College_type.findById(req.params.id);
      if (college_type == null) {
        return res.status(404).json({ message: 'Cannot find college_type' });
      }
      res.college_type = college_type;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }  
  
  
  const college_typeRoute = router;
module.exports = college_typeRoute;

