const express = require('express');
const router = express.Router();
const Review = require('../models/review');

router.get('/reviews',async (req,res)=>
{
    try
    {
        if(req.query['_id'])
        {
            const filter = {overview_id:req.query['_id']};
            const reviews = await Review.find(filter).populate('overview_id').populate('posted_by').populate('course_id');
            return res.json(reviews);
        }
        else
        {
            const reviews = await Review.find().populate('overview_id').populate('posted_by').populate('course_id');
            return res.json(reviews);
        }
    }
    catch(err)
    {
        return res.json({message:err.message});
    }
});

router.get('/reviews/:id',getReview,async (req,res)=>
{
    return res.json(res.review);
});

router.post('/reviews', async (req, res) => 
{
    const review = new Review(
    {
        overview_id:req.body.overview_id,
        course_id:req.body.course_id,
        posted_by:req.body.posted_by,
        batch:req.body.batch,
        college_infrastructure:req.body.college_infrastructure,
        college_infrastructure_ratings:req.body.college_infrastructure_ratings,
        academics:req.body.academics,
        academics_ratings:req.body.academics_ratings,
        placements:req.body.placements,
        placements_ratings:req.body.placements_ratings,
        value_for_money:req.body.value_for_money,
        value_for_money_ratings:req.body.value_for_money_ratings,
        campus_life:req.body.campus_life,
        campus_life_ratings:req.body.campus_life_ratings,
        overall:req.body.overall,
        overall_ratings:req.body.overall_ratings,
        isAnonymous:req.body.isAnonymous,
        isVerifyed:req.body.isVerifyed,
    }
    );

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
});

router.put('/reviews/:id',getReview ,async (req, res) => 
{
    if(req.body.college_infrastructure != null)
    {
        res.review.college_infrastructure = req.body.college_infrastructure;
    }
    if(req.body.college_infrastructure_ratings != null)
    {
        res.review.college_infrastructure_ratings = req.body.college_infrastructure_ratings;
    }
    if(req.body.academics != null)
    {
        res.review.academics = req.body.academics;
    }
    if(req.body.academics_ratings != null)
    {
        res.review.academics_ratings = req.body.academics_ratings;
    }
    if(req.body.placements != null)
    {
        res.review.placements = req.body.placements;
    }
    if(req.body.placements_ratings != null)
    {
        res.review.placements_ratings = req.body.placements_ratings;
    }
    if(req.body.value_for_money != null)
    {
        res.review.value_for_money = req.body.value_for_money;
    }
    if(req.body.value_for_money_ratings != null)
    {
        res.review.value_for_money_ratings = req.body.value_for_money_ratings;
    }
    if(req.body.campus_life != null)
    {
        res.review.campus_life = req.body.campus_life;
    }
    if(req.body.campus_life_ratings != null)
    {
        res.review.campus_life_ratings = req.body.campus_life_ratings;
    }
    if(req.body.overall != null)
    {
        res.review.overall = req.body.overall;
    }
    if(req.body.overall_ratings != null)
    {
        res.review.overall_ratings = req.body.overall_ratings;
    }
    if(req.body.isAnonymous != null)
    {
        res.review.isAnonymous = req.body.isAnonymous;
    }
    if(req.body.isVerifyed != null)
    {
        res.review.isVerifyed = req.body.isVerifyed;
    }
    try 
    {
        const updatedReview = await res.review.save();
        res.json(updatedReview);
    } 
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/reviews/:id',getReview ,async (req, res) => 
{
    try 
    {
        await res.review.remove();
        res.json({ message: 'Review deleted' });
    } 
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});


async function getReview(req, res, next) {
    try {
      const review = await Review.findById(req.params.id).populate('overview_id').populate('posted_by').populate('course_id');
      if (review == null) {
        return res.status(404).json({ message: 'Cannot find review' });
      }
      res.review = review;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
}  



module.exports = router;