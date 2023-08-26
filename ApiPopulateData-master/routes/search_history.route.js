const express = require('express');
const router = express.Router();
const search_history = require('../models/search_history');

router.post('/search-history', async (req, res) => {
  try {
    const collegeCode = req.body.college_code;
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    let history = await search_history.findOne({ college_code: collegeCode, 'created_at.month': month, 'created_at.year': year });

    if (!history) {
      // If no search history entry exists for the current month and college code, create a new one
      history = new search_history({
        college_code: collegeCode,
        created_at: {
          month: month,
          year: year
        }
      });
    } else {
      // If a search history entry already exists, increment its count
      history.count += 1;
    }

    const updatedHistory = await history.save();

    res.status(200).json(updatedHistory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  

const Route = router;
module.exports = Route;