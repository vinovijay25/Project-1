const express = require('express');
const router = express.Router();
const Notifications = require('../models/notification');

router.get("/notifications",async (req,res)=>{
    const notification = await Notifications.find();
    res.status(200).json(notification);
});

router.get("/notifications/:id",async (req,res)=>{
    try
    {
        const notification = await Notifications.findOne({_id:req.params.id});
        res.status(200).json(notification);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});

router.post("/notifications",async (req,res)=>{
    try
    {
        const notification = new Notifications({
            title:req.body.title,
            description:req.body.description,
            url:req.body.url
        });
        const newNotification = await notification.save();
        res.status(200).json(newNotification);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});
router.put("/notifications/:id",async (req,res)=>{
    try
    {
        const notification = await Notifications.findById(req.params.id);
        if(req.body.title)
        {
            notification.title = req.body.title;
        }
        if(req.body.description)
        {
            notification.description = req.body.description;
        }
        if(req.body.url)
        {
            notification.url = req.body.url;
        }
        const newNotification = await notification.save();
        res.status(200).json(newNotification);
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});
router.delete("/notifications/:id",async (req,res)=>{
    try
    {
        const notification = await Notifications.findById(req.params.id);
        await notification.remove();
        res.status(200).json({ message: 'notification deleted' });
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});

module.exports = router;