
const express = require('express');
const router = express.Router();
const Cutoff = require('../models/cutoff');
const Overview = require('../models/Overview');
// const Course = require('../models/Course');
// get all cutoffs
router.get('/cutoffs', async (req, res) => {
    try {
      const cutoffs = await Cutoff.find().populate("course_id");
      res.json(cutoffs);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // get a single cutoff
  router.get('/cutoffs/:id', getCutoff, (req, res) => {
    res.json(res.cutoff);
  });
  
  // create a new cutoff
  router.post('/cutoffs', async (req, res) => {
    const cutoff = new Cutoff({
      overview_id: req.body.overview_id,
      course_id: req.body.course_id,
      cutof_cutoff: req.body.cutof_cutoff,
      cutof_rank: req.body.cutof_rank,
      cutof_year: req.body.cutof_year,
      caste: req.body.caste,
      bc: req.body.bc,
      bcm: req.body.bcm,
      mbc: req.body.mbc,
      oc: req.body.oc,
      sc: req.body.sc,
      sca: req.body.sca,
      st: req.body.st,
      bc_rank: req.body.bc_rank,
      bcm_rank: req.body.bcm_rank,
      mbc_rank: req.body.mbc_rank,
      oc_rank: req.body.oc_rank,
      sc_rank: req.body.sc_rank,
      sca_rank: req.body.sca_rank,
      st_rank: req.body.st_rank,
    });

    try {
      const newCutoff = await cutoff.save();
      await Overview.findByIdAndUpdate({_id:req.body.overview_id},{'$push':{cutoff_id:newCutoff._id}},{ useFindAndModify: false });
      res.status(201).json(newCutoff);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // update an cutoff
  router.put('/cutoffs/:id', getCutoff, async (req, res) => {
    if (req.body.overview_id != null) {
      res.cutoff.overview_id = req.body.overview_id;
    }
    if (req.body.course_id != null) {
      res.cutoff.course_id = req.body.course_id;
    }
    if (req.body.cutof_rank != null) {
      res.cutoff.cutof_rank = req.body.cutof_rank;
    }
    if (req.body.cutof_cutoff != null) {
      res.cutoff.cutof_cutoff = req.body.cutof_cutoff;
    }
    if (req.body.cutof_year != null) {
      res.cutoff.cutof_year = req.body.cutof_year;
    }
    if (req.body.caste != null) {
      res.cutoff.caste = req.body.caste;
    }
    if (req.body.bc != null) {
      res.cutoff.bc = req.body.bc;
    }
    if (req.body.bcm != null) {
      res.cutoff.bcm = req.body.bcm;
    }
    if (req.body.mbc != null) {
      res.cutoff.mbc = req.body.mbc;
    }
    if (req.body.oc != null) {
      res.cutoff.oc = req.body.oc;
    }
    if (req.body.sc != null) {
      res.cutoff.sc = req.body.sc;
    }
    if (req.body.sca != null) {
      res.cutoff.sca = req.body.sca;
    }
    if (req.body.st != null) {
      res.cutoff.st = req.body.st;
    }
    if (req.body.bc_rank != null) {
      res.cutoff.bc_rank = req.body.bc_rank;
    }
    if (req.body.bcm_rank != null) {
      res.cutoff.bcm_rank = req.body.bcm_rank;
    }
    if (req.body.mbc_rank != null) {
      res.cutoff.mbc_rank = req.body.mbc_rank;
    }
    if (req.body.oc_rank != null) {
      res.cutoff.oc_rank = req.body.oc_rank;
    }
    if (req.body.sc_rank != null) {
      res.cutoff.sc_rank = req.body.sc_rank;
    }
    if (req.body.sca_rank != null) {
      res.cutoff.sca_rank = req.body.sca_rank;
    }
    if (req.body.st_rank != null) {
      res.cutoff.st_rank = req.body.st_rank;
    }
    try {
      const updatedCutoff = await res.cutoff.save();
      res.json(updatedCutoff);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // delete an cutoff
  router.delete('/cutoffs/:id', getCutoff, async (req, res) => {
    try {
      await res.cutoff.remove();
      res.json({ message: 'Cutoff deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getCutoff(req, res, next) {
    try {
      const cutoff = await Cutoff.findById(req.params.id).populate("course_id");
      if (cutoff == null) {
        return res.status(404).json({ message: 'Cannot find cutoff' });
      }
      res.cutoff = cutoff;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }  
  
  
  const cutoffRoute = router;
module.exports = cutoffRoute;


















// const express = require('express');
// const employeeRoute = express.Router();

// let Employees = require('../models/Employee');



// employeeRoute.route('/employees').get((req, res, next) => {
//     Employees.find((error, data) => {
//         if(error) {
//             return next(error);
//         } else {
//             res.json(data);
//         }
//     });
// });


// employeeRoute.route('/employee').post((req, res, next) => {
//     Employees.create(req.body, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.json(data);
//         }
//     })
// });

// //update record

// employeeRoute.route('/employee/:id').put((req, res, next) => {
//     Employees.findByIdAndUpdate(req.params.id, {
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


// employeeRoute.route('/employee/:id').delete((req, res, next) => {
//     Employees.findByIdAndRemove(req.params.id, (error, data) => {
//         if (error) {
//             return next(error);
//         } else {
//             res.status(200).json({
//                 message: data
//             });
//         }
//     })
// });

// module.exports = employeeRoute;