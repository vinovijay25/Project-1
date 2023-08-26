const express = require('express');
const ForumCredits = require('../models/forumcredits');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Forums = require('../models/forums');
const Users = require('../models/users');

//Get all forums
router.get('/forums',async (req,res)=>
{
    if(req.query['userid'] != null)
    {
        try
        {
            const forums = await Forums.aggregate([
                {
                    $match:
                    {
                        user_id:ObjectId.createFromHexString(req.query['userid']),
                    }
                },
                {
                    $lookup:
                    {
                        from:'users',
                        localField:'user_id',
                        foreignField:'_id',
                        as:'user'
                    }
                },
                {
                    $lookup:
                    {
                        from:'forumcatagorys',
                        localField:'catagory_id',
                        foreignField:'_id',
                        as:'catagory'
                    }
                },
                {
                    $project:
                        {
                            _id:1,
                            title:1,
                            body:1,
                            catagory_id:'$catagory',
                            created_on:1,
                            user:{
                                    id:{'$arrayElemAt':['$user._id',0]},
                                    name:{'$arrayElemAt':['$user.name',0]},
                                }
                        }
                }
            ]);
            return res.json(forums);
        }
        catch (err) {
            return res.status(500).json({ message: 'forums not found.' });
        }
    }
    try
    {
        const forums = await Forums.aggregate([
            {
                $lookup:
                {
                    from:'users',
                    localField:'user_id',
                    foreignField:'_id',
                    as:'user'
                }
            },
            {
                $lookup:
                {
                    from:'forumcatagorys',
                    localField:'catagory_id',
                    foreignField:'_id',
                    as:'catagory'
                }
            },
            {
                $project:
                    {
                        _id:1,
                        title:1,
                        body:1,
                        catagory_id:'$catagory',
                        replay_id:1,
                        created_on:1,
                        user:{
                            id:{'$arrayElemAt':['$user._id',0]},
                            name:{'$arrayElemAt':['$user.name',0]},
                            }
                    }
            }
        ]);
        return res.json(forums);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
//Get one forum by id
router.get('/forums/:id',getForums,(req,res)=>
{
    res.json(res.forum);
});
//Get one forum by userid
router.get('/userforums/:id',async (req,res)=>
{
    try
    {
        const userforums = await Forums.find({user_id:req.params.id}).populate('user_id');
        res.json(userforums);
    }
    catch(err)
    {
        return res.status(201).json({message:'user can not found.'});
    }
});
//Add new forum 
router.post('/forums',async(req,res)=>
{
    var forumCredit;
    try
    {
        forumCredit = await ForumCredits.findOne({user_id:req.body.user_id});
    }
    catch(err)
    {
        return res.status(201).json({message:'user can not found.'});
    }
    if(!forumCredit.unlimited && (forumCredit == null || forumCredit.credits <= 0))
    {
        return res.status(201).json({ message: 'you dont have credidts to post forum.' });
    }
    const forum = new Forums(
        {
            title:req.body.title,
            body:req.body.body,
            user_id:req.body.user_id,
            catagory_id:req.body.catagory_id,
        }
    );
    try 
    {
        const newForum = await forum.save();
        if(!forumCredit.unlimited)
        {
            forumCredit.credits -= 1;
            forumCredit.save();
        }
        await Users.findByIdAndUpdate({_id:newForum.user_id},{'$push':{forums_id:newForum._id}},{ useFindAndModify: false });
        res.status(201).json(newForum);
    }
    catch (err) 
    {
        res.status(500).json({ message: err.message });
    }
});
//Edit forum
router.put('/forums/:id',actionForums,async (req,res)=>
{
    if(req.body.title != null)
    {
        res.forum.title = req.body.title;
    }
    if(req.body.body != null)
    {
        res.forum.body = req.body.body;
    }
    if(req.body.catagory_id != null)
    {
        res.forum.catagory_id = req.body.catagory_id;
    }
    try 
    {
        const editForum = res.forum.save();
        res.json(editForum);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/forums/:id',actionForums,async (req,res)=>
{
    try 
    {
        await res.forum.remove();
        res.json({ message: 'forum deleted' });
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getForums(req, res, next) {
    try {
      const forum = await Forums.aggregate([
        {
            $match:
            {
                _id:ObjectId.createFromHexString(req.params.id),
            }
        },
        {
            $lookup:
            {
                from:'users',
                localField:'user_id',
                foreignField:'_id',
                as:'user'
            },
        },
        {
            $lookup:
            {
                from:'forumcatagorys',
                localField:'catagory_id',
                foreignField:'_id',
                as:'catagory'
            }
        },
        {
            $project:
                {
                    _id:1,
                    title:1,
                    body:1,
                    catagory_id:'$catagory',
                    replay_id:1,
                    created_on:1,
                    user:{
                            id:{'$arrayElemAt':['$user._id',0]},
                            name:{'$arrayElemAt':['$user.name',0]},
                        },                        
                }
        }
    ]);
      if (forum.length <= 0) {
          return res.status(201).json({ message: 'Cannot find forum' });
        }
      res.forum = forum[0];
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 

async function actionForums(req, res, next) {
    try {
      const forum = await Forums.findById(req.params.id);
      if (forum == null) {
          return res.status(404).json({ message: 'Cannot find forum' });
        }
      res.forum = forum;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 


module.exports = router;