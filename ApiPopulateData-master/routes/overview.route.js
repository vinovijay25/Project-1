const express = require('express');
const router = express.Router();
const Overviews = require('../models/Overview');
const Overview = require('../models/Overview');
const ObjectId = require('mongodb').ObjectId;
const upload = require('./upload')
const path = require('path');


// get all overviews
router.get('/overviews', async (req, res) => {
  try {
    if(req.query.college_code)
    {
      const _college_code = req.query.college_code;
      const overviews = await Overview.findOne({college_code:_college_code}).populate({path:'course_id',populate:{path:'branch_id'}}).populate({path:'cutoff_id',populate:{path:'course_id',populate:{path:'branch_id'}}}).populate('facilites').populate({path:'placement',populate:'placement_statistics'});
      return res.json(overviews);
    }
    else
    {
      const overviews = await Overview.aggregate([
        {
          $lookup:
          {
            from:'courses',
            localField:'course_id',
            foreignField:'_id',
            as:'course'
          }
        },
        {
          $lookup:
          {
            from:'cutoffs',
            localField:'cutoff_id',
            foreignField:'_id',
            as:'cutoff'
          }
        },
        {
          $project:
          {
            _id: 1,
            college_type: 1,
            university_type: 1,
            email: 1,
            college_name: 1,
            college_code: 1,
            pri_gov:1,
            city: 1,
            state: 1,
            about: 1,
            year: 1,
            total_branch: 1,
            approved_intake: 1,
            autononous_stus: 1,
            addmission_auth: 1,
            address: 1,
            zipcode: 1,
            created_on: 1,
            course_id: '$course',
            cutoff_id: '$cutoff',
        
          }
        }
      ]);
      return res.json(overviews);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a single overview
router.get('/overviews/:id', getOverview, (req, res) => {
  res.json(res.overview);
});

// create a new overview
router.post('/overviews',/*upload.single('image'),*/ async (req, res) => {
  
  try {
    // const filename = req.file.filename;
    // const filePath = path.join(__dirname, '..', 'public', 'uploads', filename);
    // await fs.promises.writeFile(filePath, req.file.buffer);
  
    const overview = new Overview({
      college_type: req.body. college_type,
      university_type: req.body.university_type,
      email: req.body.email,
      college_name: req.body.college_name,
      college_code: req.body.college_code,
      pri_gov: req.body.pri_gov,
      city: req.body.city,
      state: req.body.state,
      about: req.body.about,
      year: req.body.year,
      total_branch: req.body.total_branch,
      approved_intake: req.body.approved_intake,
      autononous_stus: req.body.autononous_stus,
      addmission_auth: req.body.addmission_auth,
      nirf_rank: req.body.nirf_rank,
      naac_grade: req.body.naac_grade,
      address: req.body.address,
      zipcode: req.body.zipcode,
      cutoff_id: req.body.cutoff_id,
      course_id: req.body.course_id,
     
      // image_path: `/uploads/${filename}`,
      // course2_id: req.body.course2_id,
    });
    const newoverview = await overview.save();
    res.status(201).json(newoverview);
  } catch (err) {
    res.status(201).json({ message: err.message });
  }
});

// update a overview
router.put('/overviews/:id', actionOverview, async (req, res) => {
  if (req.body.college_type != null) {
    res.overview.college_type = req.body.college_type;
  }
  if (req.body.university_type != null) {
    res.overview.university_type = req.body.university_type;
  }
  if (req.body.email != null) {
    res.overview.email = req.body.email;
  }
  if (req.body.college_name != null) {
    res.overview.college_name = req.body.college_name;
  }
  if (req.body.college_code != null) {
    res.overview.college_code = req.body.college_code;
  }
  if (req.body.pri_gov != null) {
    res.overview.pri_gov = req.body.pri_gov;
  }
  if (req.body.city != null) {
    res.overview.city = req.body.city;
  }
  if (req.body.state != null) {
    res.overview.state = req.body.state;
  }
  if (req.body.about != null) {
    res.overview.about = req.body.about;
  }
  if (req.body.year != null) {
    res.overview.year = req.body.year;
  }
  if (req.body.total_branch != null) {
    res.overview.total_branch = req.body.total_branch;
  }
  if (req.body.approved_intake != null) {
    res.overview.approved_intake = req.body.approved_intake;
  }
  if (req.body.autononous_stus != null) {
    res.overview.autononous_stus = req.body.autononous_stus;
  }
  if (req.body.addmission_auth != null) {
    res.overview.addmission_auth = req.body.addmission_auth;
  }
  if (req.body.nirf_rank != null) {
    res.overview.nirf_rank = req.body.nirf_rank;
  }
  if (req.body.naac_grade != null) {
    res.overview.naac_grade= req.body.naac_grade;
  }
  if (req.body.address != null) {
    res.overview.address = req.body.address;
  }
  if (req.body.zipcode != null) {
    res.overview.zipcode = req.body.zipcode;
  }
  if (req.body.cutoff_id != null) {
    res.overview.cutoff_id = req.body.cutoff_id;
  }
  if (req.body.course_id != null) {
    res.overview.course_id = req.body.course_id;
  }

  // if (req.body.course2_id != null) {
  //   res.overview.course2_id = req.body.course2_id;
  // }
  try {
    const updatedoverview = await res.overview.save();
    res.json(updatedoverview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a overview
router.delete('/overviews/:id', actionOverview, async (req, res) => {
  try {
    await res.overview.remove();
    res.json({ message: 'Overview deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function actionOverview(req, res, next) {
  try {
    const overview = await Overview.findById(req.params.id);
    if (overview == null) {
      return res.status(404).json({ message: 'Cannot find overview' });
    }
    res.overview = overview;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function getOverview(req, res, next) {
  try {
    const overview = await Overview.aggregate([
      {
        $match:
        {
          _id:ObjectId.createFromHexString(req.params.id),
        }
      },
      {
        $lookup:
        {
          from:'courses',
          localField:'course_id',
          foreignField:'_id',
          as:'course'
        }
      },
      {
        $lookup:
        {
          from:'cutoffs',
          localField:'cutoff_id',
          foreignField:'_id',
          as:'cutoff'
        }
      },
      {
        $project:
        {
          _id: 1,
          college_type: 1,
          university_type: 1,
          email: 1,
          college_name: 1,
          college_code: 1,
          pri_gov:1,
          city: 1,
          state: 1,
          about: 1,
          year: 1,
          total_branch: 1,
          approved_intake: 1,
          autononous_stus: 1,
          addmission_auth: 1,
          nirf_rank: 1,
          naac_grade: 1,
          address: 1,
          zipcode: 1,
          created_on: 1,
          course_id: '$course',
          cutoff_id: '$cutoff',
        }
      }
    ]);
    if (overview.length <= 0) {
      return res.status(404).json({ message: 'Cannot find overview' });
    }
    res.overview = overview[0];
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

/*
router.get('/secret', async (req, res, next) => {
  try {
    const overviews = await Overviews.find()
      .populate('course_id')
      // .populate('course2_id')
      .populate('cutoff_id');
    res.json(overviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/secret/:id', async (req, res) => {
  try {
    const overview = await Overview.findById(req.params.id)
      .populate('course_id')
      // .populate('course2_id')
      .populate('cutoff_id');
    if (overview == null) {
      return res.status(404).json({ message: 'Cannot find overview' });
    }
    res.json(overview);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

    // create a new overview
router.post('/secret', async (req, res) => {
  const overview = new Overview({
    college_type: req.body.college_type,
    university_type: req.body.university_type,
    email: req.body.email,
    college_name: req.body.college_name,
    college_code: req.body.college_code,
    city: req.body.city,
    state: req.body.state,
    about: req.body.about,
    year: req.body.year,
    total_branch: req.body.total_branch,
    cutoff_id: req.body.cutoff_id,
    course_id: req.body.course_id,
    // course2_id: req.body.course2_id,
  });

  try {
    const newoverview = await overview.save();
    res.status(201).json(newoverview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update a overview
router.put('/secret/:id', getOverview, async (req, res) => {
  if (req.body.college_type != null) {
    res.overview.college_type = req.body.college_type;
  }
  if (req.body.university_type != null) {
    res.overview.university_type = req.body.university_type;
  }
  if (req.body.email != null) {
    res.overview.email = req.body.email;
  }
  if (req.body.college_name != null) {
    res.overview.college_name = req.body.college_name;
  }
  if (req.body.college_code != null) {
    res.overview.college_code = req.body.college_code;
  }
  if (req.body.city != null) {
    res.overview.city = req.body.city;
  }
  if (req.body.state != null) {
    res.overview.state = req.body.state;
  }
  if (req.body.about != null) {
    res.overview.about = req.body.about;
  }
  if (req.body.year != null) {
    res.overview.year = req.body.year;
  }
  if (req.body.total_branch != null) {
    res.overview.total_branch = req.body.total_branch;
  }
  if (req.body.cutoff_id != null) {
    res.overview.cutoff_id = req.body.cutoff_id;
  }
  if (req.body.course_id != null) {
    res.overview.course_id = req.body.course_id;
  }
  // if (req.body.course2_id != null) {
  //   res.overview.course2_id = req.body.course2_id;
  // }
  try {
    const updatedoverview = await res.overview.save();
    res.json(updatedoverview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// delete a overview
router.delete('/secret/:id', getOverview, async (req, res) => {
  try {
    await res.overview.remove();
    res.json({ message: 'Overview deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getOverview(req, res, next) {
  try {
    const overview = await Overview.aggregate([
      {
        $match:
        {
          _id:req.params.id,
        }
      },
      {
        $lookup:
        {
          from:'courses',
          localField:'course_id',
          foreignField:'_id',
          as:'course'
        }
      },
      {
        $lookup:
        {
          from:'cutoffs',
          localField:'cutoff_id',
          foreignField:'_id',
          as:'cutoff'
        }
      },
      {
        $project:
        {
          _id: 1,
          college_type: 1,
          university_type: 1,
          email: 1,
          college_name: 1,
          college_code: 1,
          city: 1,
          state: 1,
          about: 1,
          year: 1,
          total_branch: 2,
          course_id: '$course',
          cutoff_id: '$cutoff',
        }
      }
    ]);
    if (overview == null) {
      return res.status(404).json({ message: 'Cannot find overview' });
    }
    res.overview = overview[0];
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}


});
*/

const overviewRoute = router;
module.exports = overviewRoute;



