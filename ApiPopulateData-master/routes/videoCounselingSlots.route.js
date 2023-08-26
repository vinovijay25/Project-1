const Videocounsellingslots = require('../models/videoCounselingSlots');
const Videocounsellingstaff = require('../models/videocounselingStaffallocation');
const VideocounsellingBookings = require('../models/videocounselling');
const express = require('express');
const router = express.Router();
const moment = require('moment');

router.get('/videocounsellingslots', async (req, res) => 
{
    const slot = await Videocounsellingslots.find().populate('catagory_id');
    for (let i = 0; i < slot.length; i++) 
    {  
        const bookings = await VideocounsellingBookings.find({time_and_slot:slot[i].id});
        let filteredList = [];
        bookings.forEach(bk => {
            const date1 = moment(bk.counselling_date).format("DD-MM-YYYY");
            const date2 = moment(new Date()).format("DD-MM-YYYY");
            if(req.query.date)
            {
                if(date1 == req.query.date)
                {
                    filteredList.push(bk);
                }
            }
            else
            {
                if(date1 == date2)
                {
                    filteredList.push(bk);
                }
            }
        });
        slot[i].booked_slots = filteredList.length;
    }
    return res.json(slot);

});

router.get('/videocounsellingslots/:id',getSlot, async (req, res) => {
    const bookings = await VideocounsellingBookings.find({time_and_slot:req.params.id});
    const slot = res.slot;
    let filteredList = [];
    bookings.forEach(bk => {
        const date1 = moment(bk.counselling_date).format("DD-MM-YYYY");
        const date2 = moment(new Date()).format("DD-MM-YYYY");
        if(date1 == date2)
        {
            filteredList.push(bk);
        }
    });
    slot.booked_slots = filteredList.length;
    return res.json(slot);
});

router.post('/videocounsellingslots', async (req, res) => {
    const from_time = moment(`2023-04-19T${req.body.from_time}:00.000+05:30`).format();
    const to_time = moment(`2023-04-19T${req.body.to_time}:00.000+05:30`).format();
    const slot = new Videocounsellingslots(
        {
            from_time:from_time,
            to_time:to_time,
            total_slots:req.body.total_slots,
            catagory_id:req.body.catagory_id,
        });
    try 
    {
        const newslot = await slot.save();
        res.status(200).json(newslot);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/videocounsellingslots/:id',getSlot,async(req,res)=>{
    if(req.body.from_time != null)
    {
        const from_time = moment(`2023-04-19T${req.body.from_time}:00.000+05:30`).format();
        res.slot.from_time = from_time;
    }
    if(req.body.to_time != null)
    {
        const to_time = moment(`2023-04-19T${req.body.to_time}:00.000+05:30`).format();
        res.slot.to_time = to_time;
    }
    if(req.body.total_slots != null)
    {
        res.slot.total_slots = req.body.total_slots;
    }
    if(req.body.catagory_id != null)
    {
        res.slot.catagory_id = req.body.catagory_id;
    }
    try
    {
        const editCatagory = await res.slot.save();
        res.json(editCatagory);
    }
    catch(err)
    {
        res.json({message:err.message});
    }

});

router.delete('/videocounsellingslots/:id',getSlot,async(req,res)=>{
    try {
        await res.slot.remove();
        res.json({ message: 'catagory deleted' });
      } catch (err) {
        res.status(500).json({ message: err.message });
      }

});


async function getSlot(req, res, next) {
    try {
      const slot = await Videocounsellingslots.findById(req.params.id).populate('catagory_id');
      if (slot == null) {
        return res.status(404).json({ message: 'Cannot find slot' });
      }
      res.slot = slot;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
} 


module.exports = router;