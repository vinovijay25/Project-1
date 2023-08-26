const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Videocounselling = require('../models/videocounselling');
const Users = require('../models/users');
const videocounsellingCredits = require('../models/videocounselingcredits');
const Staffallocation = require('../models/videocounselingStaffallocation');

//Get all videocounselling
router.get('/videocounselling',async (req,res)=>
{
    if(req.query['userid'] != null)
    {
        try
        {
            const videocounselling = await Videocounselling.find({user_id:req.query['userid']}).populate({path:'user_id',select:'name'}).populate('catagory_id').populate('time_and_slot');
            return res.json(videocounselling);
        }
        catch (err) {
            return res.status(500).json({ message: 'videocounselling not found.' });
        }
    }
    try
    {
        const videocounselling= await Videocounselling.find().populate({path:'user_id',select:'name'}).populate('catagory_id').populate('time_and_slot');
        return res.json(videocounselling);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
//Get one videocounselling by id
router.get('/videocounselling/:id',getVideocounselling,(req,res)=>
{
    res.json(res.videocounselling);
});
// Add new videocounselling
router.post('/videocounselling',async(req,res)=>
{
    var vcCredit;
    try
    {
        vcCredit = await videocounsellingCredits.findOne({user_id:req.body.user_id});
    }
    catch(err)
    {
        return res.status(404).json({message:'user not found.'});
    }
    if(!vcCredit.unlimited && (vcCredit == null || vcCredit.credits <= 0))
    {
        return res.status(404).json({ message: 'you dont have credidts to book videocounseling.' });
    }
    const videocounselling = new Videocounselling(
        {
            counselling_date:req.body.counselling_date,
            time_and_slot:req.body.time_and_slot,
            user_id:req.body.user_id,
            link:req.body.link,
            catagory_id:req.body.catagory_id,
        }
    );
    try 
    {
        const newVideocounselling = await videocounselling.save();
        if(!vcCredit.unlimited)
        {
            vcCredit.credits -= 1;
            vcCredit.save();
        }
        const staffallocation = new Staffallocation(
            {
                videocounselling_id: newVideocounselling._id,
                videocounsellingslot_id:req.body.time_and_slot,
            }
            );
        const newStaffallocation = await staffallocation.save();
        res.status(201).json(newVideocounselling);
    }
    catch (err) 
    {
        res.status(404).json({ message: err.message });
    }
});


//Edit videocounselling
router.put('/videocounselling/:id',actionVideocounselling,async (req,res)=>
{
    if(req.body.counselling_date != null)
    {
        res.videocounselling.counselling_date = req.body.counselling_date;
    }
    if(req.body.time_and_slot != null)
    {
        res.videocounselling.time_and_slot = req.body.time_and_slot;
    }
    if(req.body.catagory_id != null)
    {
        res.videocounselling.catagory_id = req.body.catagory_id;
    }
    if(req.body.status != null)
    {
        res.videocounselling.status = req.body.status;
    }
    if(req.body.link != null)
    {
        res.videocounselling.link = req.body.link;
    }
    try 
    {
        const editVideocounselling = res.videocounselling.save();
        let formData = {}
        if(req.body.status != 'canceled' && req.body.status != 'expaired')
        {
            formData = {videocounsellingslot_id:req.body.time_and_slot};
        }
        else
        {
            formData = {videocounsellingslot_id:req.body.time_and_slot,adminuser_id:null};
        }
        const staffallocation = await Staffallocation.findOneAndUpdate({videocounselling_id:res.videocounselling._id},formData);
        res.json(editVideocounselling);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/videocounselling/:id',actionVideocounselling,async (req,res)=>
{
    try 
    {
        await res.videocounselling.remove();
        res.json({ message: 'videocounselling deleted' });
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getVideocounselling(req, res, next) {
    try {
      const videocounselling = await Videocounselling.find({_id:req.params.id}).populate({path:'user_id',select:'name'}).populate('catagory_id').populate('time_and_slot');
      if (videocounselling.length <= 0) {
          return res.status(201).json({ message: 'Cannot find videocounselling' });
        }
      res.videocounselling = videocounselling[0];
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 

async function actionVideocounselling(req, res, next) {
    try {
      const videocounselling = await Videocounselling.findById(req.params.id);
      if (videocounselling == null) {
          return res.status(404).json({ message: 'Cannot find videocounselling' });
        }
      res.videocounselling = videocounselling;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 


module.exports = router;