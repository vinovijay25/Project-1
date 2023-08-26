const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const VideocounselingStaffallocation = require('../models/videocounselingStaffallocation');
const Videocounselling = require('../models/videocounselling');


//Get all videocounselingStaffallocation
router.get('/videocounselingStaffallocation',async (req,res)=>
{
    try
    {
        if(req.query['slotid'])
        {
            const videocounselingStaffallocation = await VideocounselingStaffallocation.find({videocounsellingslot_id:req.query['slotid']}).populate({path:'videocounselling_id',populate:'user_id'}).populate('videocounsellingslot_id').populate('adminuser_id');
            return res.json(videocounselingStaffallocation);
        }
        else if(req.query['bookingid'])
        {
            const videocounselingStaffallocation = await VideocounselingStaffallocation.findOne({videocounselling_id:req.query['bookingid']}).populate({path:'videocounselling_id',populate:'user_id'}).populate('videocounsellingslot_id').populate('adminuser_id');
            return res.json(videocounselingStaffallocation);
        }
        else
        {
            const videocounselingStaffallocation = await VideocounselingStaffallocation.find().populate({path:'videocounselling_id',populate:'user_id'}).populate('videocounsellingslot_id').populate('adminuser_id');
            return res.json(videocounselingStaffallocation);
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});





//Get one videocounselingStaffallocation by id
router.get('/videocounselingStaffallocation/:id',getVideocounselingStaffallocation,(req,res)=>
{
    res.json(res.videocounselingStaffallocation);
});





// Add new videocounselingStaffallocation
router.post('/videocounselingStaffallocation',async(req,res)=>
{
    const videocounselingStaffallocation = new VideocounselingStaffallocation(
        {
            // user_id:req.body.user_id,
            videocounselling_id:req.body.videocounselling_id,
            videocounsellingslot_id:req.body.videocounsellingslot_id,
            adminuser_id:req.body.adminuser_id,
            // staffallocation:req.body.staffallocation
        }
    );
    try 
    {
        const newVideocounselingStaffallocation = await videocounselingStaffallocation.save();
        // forumCredit.credits -= 1;
        // forumCredit.save();
        // await videocounsellings.findByIdAndUpdate({_id:newForum.videocounselling_id},{'$push':{forums_id:newForum._id}},{ useFindAndModify: false });
        res.status(201).json(newVideocounselingStaffallocation);
    }
    catch (err) 
    {
        res.status(201).json({ message: err.message });
    }
});




//Edit videocounselingStaffallocation
router.put('/videocounselingStaffallocation/:id',actionVideocounselingStaffallocation,async (req,res)=>
{
    // if(req.body.user_id != null)
    // {
    //     res.videocounselingStaffallocation.user_id = req.body.user_id;
    // }
    if(req.body.videocounselling_id != null)
    {
        res.videocounselingStaffallocation.videocounselling_id = req.body.videocounselling_id;
    }
    if(req.body.videocounsellingslot_id != null)
    {
        res.videocounselingStaffallocation.videocounsellingslot_id = req.body.videocounsellingslot_id;
    }
    if(req.body.adminuser_id != null)
    {
        if(req.body.adminuser_id != 'NA')
        {
            res.videocounselingStaffallocation.adminuser_id = req.body.adminuser_id;
        }
        else
        {
            res.videocounselingStaffallocation.adminuser_id = null;
        }
    }
    try 
    {
        const editVideocounselingStaffallocation = res.videocounselingStaffallocation.save();
        res.json(editVideocounselingStaffallocation);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/videocounselingStaffallocation/:id',actionVideocounselingStaffallocation,async (req,res)=>
{
    try 
    {
        await res.videocounselingStaffallocation.remove();
        res.json({ message: 'videocounselingStaffallocation deleted' });
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getVideocounselingStaffallocation(req, res, next) {
    try {
      const videocounselingStaffallocation = await VideocounselingStaffallocation.find({_id:req.params.id}).populate({path:'videocounselling_id',select:'name'}).populate('catagory_id').populate('time_and_slot');
      if (videocounselingStaffallocation.length <= 0) {
          return res.status(201).json({ message: 'Cannot find videocounselingStaffallocation' });
        }
      res.videocounselingStaffallocation = videocounselingStaffallocation[0];
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 

async function actionVideocounselingStaffallocation(req, res, next) {
    try {
      const videocounselingStaffallocation = await VideocounselingStaffallocation.findById(req.params.id);
      if (videocounselingStaffallocation == null) {
          return res.status(404).json({ message: 'Cannot find videocounselingStaffallocation' });
        }
      res.videocounselingStaffallocation = videocounselingStaffallocation;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 


module.exports = router;