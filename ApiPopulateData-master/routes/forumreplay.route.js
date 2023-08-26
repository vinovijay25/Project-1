const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Forumreplays = require('../models/forumreplays');
const Forums = require('../models/forums');

//Get all forums
router.get('/forumreplays',async (req,res)=>
{
    if(req.query['forumid'] != null)
    {
        try
        {
            const forumreplays = await Forumreplays.aggregate([
                {
                    $match:
                    {
                        forum_id:ObjectId.createFromHexString(req.query['forumid'])
                    }
                },
                {
                    $lookup:
                    {
                        from:'adminusers',
                        localField:'adminuser_id',
                        foreignField:'_id',
                        as:'user'
                    }
                },
                {
                    $project:
                    {
                        _id:1,
                        title:1,
                        body:1,
                        forum_id:1,
                        created_on:1,
                        replayed_by:{
                                id:{'$arrayElemAt':['$user._id',0]},
                                username:{'$arrayElemAt':['$user.username',0]},
                            }

                    }
                }
            ]);
            return res.json(forumreplays);
        }
        catch(err)
        {
            return res.status(500).json({ message: 'forumreplays not found.' });   
        }
        
    }
    try
    {
        const forumreplays = await Forumreplays.aggregate([
            {
                $lookup:
                {
                    from:'adminusers',
                    localField:'adminuser_id',
                    foreignField:'_id',
                    as:'user'
                }
            },
            {
                $project:
                    {
                        _id:1,
                        title:1,
                        body:1,
                        forum_id:1,
                        created_on:1,
                        replayed_by:{
                                id:{'$arrayElemAt':['$user._id',0]},
                                username:{'$arrayElemAt':['$user.username',0]},
                            }
                    }
            }
        ]);
        return res.json(forumreplays);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
//Get one forum by id
// router.get('/forumreplays/:id',getForums,(req,res)=>
// {
//     res.json(res.forumreplay);
// });
router.get('/forumreplays/:id',getForums,(req,res)=>
{
    res.json(res.forumreplay);
});
//Add new forum 
router.post('/forumreplays',async(req,res)=>
{
    const forumreplay = new Forumreplays(
        {
            forum_id:req.body.forumid,
            body:req.body.body,
            adminuser_id:req.body.adminuserid,
        }
    );
    try 
    {
        const newForumreplay = await forumreplay.save();
        await Forums.findByIdAndUpdate({_id:newForumreplay.forum_id},{'$push':{replay_id:newForumreplay._id}},{ useFindAndModify: false });
        res.status(201).json(newForumreplay);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
//Edit forum
router.put('/forumreplays/:id',actionForums,async (req,res)=>
{
    if(req.body.body != null)
    {
        res.forumreplay.body = req.body.body;
    }
    try 
    {
        const editForumreplay = res.forumreplay.save();
        res.json(editForumreplay);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/forumreplays/:id',actionForums,async (req,res)=>
{
    try 
    {
        const _replay = await res.forumreplay.remove();
        res.json({ message: 'forumreplay deleted' });
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getForums(req, res, next) {
    try {
      const forumreplay = await Forumreplays.aggregate([
        {
            $match:
            {
                _id:ObjectId.createFromHexString(req.params.id),
            }
        },
        {
            $lookup:
            {
                from:'adminusers',
                localField:'adminuser_id',
                foreignField:'_id',
                as:'user'
            }
        },
        {
            $project:
                {
                    _id:1,
                    title:1,
                    body:1,
                    forum_id:1,
                    created_on:1,
                    replayed_by:{
                            id:{'$arrayElemAt':['$user._id',0]},
                            username:{'$arrayElemAt':['$user.username',0]},
                        }
                }
        }
    ]);
      if (forumreplay == null) {
          return res.status(404).json({ message: 'Cannot find forumreplay' });
        }
      res.forumreplay = forumreplay[0];
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 

async function actionForums(req, res, next) {
    try {
      const forumreplay = await Forumreplays.findById(req.params.id);
      if (forumreplay.length <= 0) {
          return res.status(404).json({ message: 'Cannot find forumreplay' });
        }
      res.forumreplay = forumreplay;
      if(req.method  === "DELETE")
      {
          await Forums.findByIdAndUpdate({_id:forumreplay.forum_id},{'$pull':{replay_id:forumreplay._id}},{ useFindAndModify: false });
      }
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 


module.exports = router;