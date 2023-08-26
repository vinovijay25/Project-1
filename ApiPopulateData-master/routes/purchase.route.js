const express = require('express');
const router = express.Router();
const Packages = require('../models/package');
const Users = require('../models/users');
const ForumCredits = require('../models/forumcredits');
const VideoCounselingCredits = require('../models/videocounselingcredits');
const PredictionCredits = require('../models/predictioncredits')
const ObjectId = require('mongodb').ObjectId;


router.post('/purchase',async (req,res)=>{
    try{

        const package = await getPackage(req.body.package_id);
        const user = await getUser(req.body.user_id);
        if(package == null)
        {
            return res.json({message:'package not found.'});
        }
        if(user == null)
        {
            return res.json({message:'user not found.'});
        }
        if(package.packages != null)
        {
            for(let i = 0;i < package.packages.length;i++)
            {
                if(package.packages[i] == "QnA")
                {
                    const forumCredit = await ForumCredits.findOne({user_id:req.body.user_id});
                    const currentDate = new Date();
                    if(forumCredit != null)
                    {
                        try
                        {
                            forumCredit.credits += package.credits[i];
                            forumCredit.exp_date = new Date(currentDate.getTime() + (package.validity * 24 * 60 * 60 * 1000));
                            forumCredit.save();
                        }
                        catch(err)
                        {
                            return res.json({message:err.message});
                        }
                    }
                    else
                    {
                        const exp_date = new Date(currentDate.getTime() + (package.validity * 24 * 60 * 60 * 1000));
                        const forumCredit = new ForumCredits({
                            user_id:req.body.user_id,
                            exp_date: exp_date,
                            credits:package.credits[i]
                        })
                        const newForumcredit = await forumCredit.save();
                    }

                }
                else if(package.packages[i] == "VideoCounseling")
                {
                    const videoCredit = await VideoCounselingCredits.findOne({user_id:req.body.user_id});
                    const currentDate = new Date();
                    if(videoCredit != null)
                    {
                        try
                        {
                            videoCredit.credits += package.credits[i];
                            videoCredit.exp_date = new Date(currentDate.getTime() + (package.validity * 24 * 60 * 60 * 1000));
                            videoCredit.save();
                        }
                        catch(err)
                        {
                            return res.json({message:err.message});
                        }
                    }
                    else
                    {
                        const exp_date = new Date(currentDate.getTime() + (package.validity * 24 * 60 * 60 * 1000));
                        const videoCredit = new VideoCounselingCredits({
                            user_id:req.body.user_id,
                            exp_date: exp_date,
                            credits:package.credits[i]
                        })
                        const newVideocredit = await videoCredit.save();
                    }

                }
                else if(package.packages[i] == "Prediction")
                {
                    const predictionCredit = await PredictionCredits.findOne({user_id:req.body.user_id});
                    const currentDate = new Date();
                    if(predictionCredit != null)
                    {
                        try
                        {
                            predictionCredit.credits += package.credits[i];
                            predictionCredit.exp_date = new Date(currentDate.getTime() + (package.validity * 24 * 60 * 60 * 1000));
                            predictionCredit.save();
                        }
                        catch(err)
                        {
                            return res.json({message:err.message});
                        }
                    }
                    else
                    {
                        const exp_date = new Date(currentDate.getTime() + (package.validity * 24 * 60 * 60 * 1000));
                        const predictionCredit = new PredictionCredits({
                            user_id:req.body.user_id,
                            exp_date: exp_date,
                            credits:package.credits[i]
                        })
                        const newPredictioncredit = await predictionCredit.save();
                    }

                }
            }         
            res.json(package);
            
        }
        else
        {   
            return res.status(400).json({message:'type not found.'});
        }
    }
    catch (err) 
    {
        return res.json({message:err.message});
    }
});

async function getPackage(_id) {
    try 
    {
      const package = await Packages.findById(_id);
      return package;
    } 
    catch (err) 
    {
      return null;
    }
}  
async function getUser(_id) {
    try 
    {
      const user = await Users.findById(_id);
      return user;
    } 
    catch (err) 
    {
      return null;
    }
}  
 

module.exports = router;