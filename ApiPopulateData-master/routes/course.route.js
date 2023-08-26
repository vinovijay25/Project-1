const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const Overview = require('../models/Overview');

// get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find().populate('branch_id');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get a single course
router.get('/courses/:id', getCourse, (req, res) => {
  res.json(res.course);
});

// create a new course
router.post('/courses', async (req, res) => {
  const course = new Course({
    overview_id: req.body.overview_id,
    branch_code: req.body.branch_code,
    branch_id: req.body.branch_id,
    branch_approve: req.body.branch_approve,
    duration: req.body.duration,
    branch_year: req.body.branch_year,
    nba_acc: req.body.nba_acc,
    acc_valid: req.body.acc_valid,
    timings: req.body.timings,
    total_fees: req.body.total_fees,
    naac_acc: req.body.naac_acc,
    nrf_rank: req.body.nrf_rank,
    valid_upto: req.body.valid_upto,
  });
  
  try {
    const newCourse = await course.save();
    await Overview.findByIdAndUpdate({_id:req.body.overview_id},{'$push':{course_id:newCourse._id}},{ useFindAndModify: false });
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// update an course
router.put('/courses/:id', getCourse, async (req, res) => {
  if (req.body.overview_id != null) {
    res.course.overview_id = req.body.overview_id;
  }
  if (req.body.branch_code != null) {
    res.course.branch_code = req.body.branch_code;
  }
  if (req.body.branch_id != null) {
    res.course.branch_id = req.body.branch_id;
  }
  if (req.body.branch_approve != null) {
    res.course.branch_approve = req.body.branch_approve;
  }
  if (req.body.duration != null) {
    res.course.duration = req.body.duration;
  }
  if (req.body.branch_year != null) {
    res.course.branch_year = req.body.branch_year;
  }
  if (req.body.nba_acc != null) {
    res.course.nba_acc = req.body.nba_acc;
  }
  if (req.body.acc_valid != null) {
    res.course.acc_valid = req.body.acc_valid;
  }
  if (req.body.timings != null) {
    res.course.timings = req.body.timings;
  }
  if (req.body.total_fees != null) {
    res.course.total_fees = req.body.total_fees;
  }
  if (req.body.naac_acc != null) {
    res.course.naac_acc = req.body.naac_acc;
  }
  if (req.body.nrf_rank != null) {
    res.course.nrf_rank = req.body.nrf_rank;
  }
  if (req.body.valid_upto != null) {
    res.course.valid_upto = req.body.valid_upto;
  }
  if (req.body.postalCode != null) {
    res.course.postalCode = req.body.postalCode;
  }
  try {
    const updatedCourse = await res.course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});   

// delete an course
router.delete('/courses/:id', getCourse, async (req, res) => {
  try {
    await res.course.remove();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.id).populate('branch_id');
    if (course == null) {
      return res.status(404).json({ message: 'Cannot find course' });
    }
    res.course = course;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

const courseRoute = router;
module.exports = courseRoute;










// const express = require('express');
// const addressRoute = express.Router();

// let Addresses = require('../models/Address');

// addressRoute.route('/addresses').get((req, res, next) => {
//     Addresses.find((error, data) => {
//         if(error) {
//             return next(error);
//         } else {
//             res.json(data);
//         }
//     });
// });


// addressRoute.route('/address').post((req, res, next) => {
//     Addresses.create(req.body, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.json(data);
//         }
//     })
// });

// //update record

// addressRoute.route('/address/:id').put((req, res, next) => {
//     Addresses.findByIdAndUpdate(req.params.id, {
//         $set: req.body
//     },
//         (error, data) => {
//             if (error) {
//                 return next(error);
//             } else {
//                 res.json(data);
//             }
//         }
//     )
// });

// //delete record

// addressRoute.route('/address/:id').delete((req, res, next) => {
//     Addresses.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 message: data
//             });
//         }
//     })
// });

// module.exports = addressRoute;