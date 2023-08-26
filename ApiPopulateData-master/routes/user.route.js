const express = require('express');
const forumcredits = require('../models/forumcredits');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Users = require('../models/users');
const videocounselingcredits = require('../models/videocounselingcredits');
const predictioncredits = require('../models/predictioncredits');
const hashPassword = require('../utils/hashPassword');
const sendEmail = require('../utils/sendMail');



//Get all users
router.get('/users',async (req,res)=>
{
    try
    {
        const users = await Users.aggregate([
            {
                $project:
                {
                    _id:1,
                    name:1,
                    email:1,
                    phone:1,
                    studyingIn:1,
                    educationInterest:1,
                    currentCity:1,
                    verifyed:1,
                    created_on:1
                }
            }
        ]);
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Get one user by id
router.get('/users/:id',getUser,async(req,res)=>
{
    if(req.query['q'] == 'verify')
    {
        try
        {
            await Users.findOneAndUpdate({_id:res.user._id},{verifyed:true},{ useFindAndModify: false });
            return res.status(201).json({message:'account verifyed.'});   
        }
        catch(err)
        {
            res.status(500).json({ message: err.message });
        }
    }
    res.json(res.user);
});
//Add new user
router.post('/users',async(req,res)=>
{
    if(req.body.email)
    {
        try
        {
            if(await Users.findOne({email:req.body.email}) != null)
            {
                return res.status(201).json({message:'email already taken.'});
            }
        }
        catch(err)
        {
            return res.status(400).json({message:err.message});
        }
    }
    if(req.body.phone)
    {
        try
        {
            if(await Users.findOne({phone:req.body.phone}) != null)
            {
                return res.status(201).json({message:'phone already taken.'});
            }
        }
        catch(err)
        {
            return res.status(400).json({message:err.message});
        }
    }
    const users = new Users(
        {
          name:req.body.name,
          email:req.body.email,
          phone:req.body.phone,
          studyingIn:req.body.studyingIn,
          educationInterest:req.body.educationInterest,
          currentCity:req.body.currentCity,
        }
    );
    try 
    {
        
        const newUser = await users.save();
        // const url = `user email verify URL: <a href="http://localhost:4200/verify/${newUser._id}">Verify email</a>`
        const html = composemail(newUser._id);
        const subject = 'Email id verification';
        try
        {
            await sendEmail(req.body.email,subject,html);
        }
        catch(err)
        {
            console.log({email:err});
        }
        res.status(201).json({message:'New user added.'});
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
//Edit user
router.put('/users/:id',actionUser,async (req,res)=>
{
    if(req.body.name != null)
    {
        res.user.name = req.body.name;
    }
    if(req.body.email != null)
    {
        res.user.email = req.body.email;
    }
    if(req.body.phone != null)
    {
        res.user.phone = req.body.phone;
    }
    if(req.body.studyingIn != null)
    {
        res.user.studyingIn = req.body.studyingIn;
    }
    if(req.body.educationInterest != null)
    {
        res.user.educationInterest = req.body.educationInterest;
    }
    if(req.body.currentCity != null)
    {
        res.user.currentCity = req.body.currentCity;
    }

    try 
    {
        const editUser= res.user.save();
        res.json(editUser);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/users/:id',actionUser,async (req,res)=>
{
    try 
    {
        await res.user.remove();
        res.json({ message: 'user deleted' });
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    try {
      const user = await Users.aggregate([
        {
            $match:
            {
                _id:ObjectId.createFromHexString(req.params.id),
            }
        },
        {
            $project:
                {
                    _id:1,
                    name:1,
                    email:1,
                    phone:1,
                    verifyed:1,
                    currentCity:1,
                    studyingIn:1,
                    educationInterest:1,
                    created_on:1
                }
        }
    ]);
      if (user.length <= 0) {
          return res.status(201).json({ message: 'Cannot find user' });
        }
      res.user = user[0];
      next();
    } catch (err) {
      return res.status(404).json({ message: 'Cannot find user' });
    }
  } 

  async function actionUser(req, res, next) {
    try {
      const user = await Users.findById(req.params.id)
      if (user == null) {
          return res.status(404).json({ message: 'Cannot find user' });
        }
      res.user = user;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 

//user package credits
router.get('/userscredits/:id',async(req,res)=>
{
    try
    {
        const fcredit = await forumcredits.findOne({user_id:ObjectId.createFromHexString(req.params.id)}); 
        const vcredit = await videocounselingcredits.findOne({user_id:ObjectId.createFromHexString(req.params.id)}); 
        const pcredit = await predictioncredits.findOne({user_id:ObjectId.createFromHexString(req.params.id)}); 
        res.status(200).json({forum_credits:fcredit,videocounseling_credits:vcredit,predictioncredits:pcredit});
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
});

//user edit user credits
router.put('/userscredits/:id',async(req,res)=>
{
    try
    {
        if(req.body.type && req.body.type != null)
        {
            if (req.body.type == 'qna') {
                let fcredit = await forumcredits.findOne({ user_id: ObjectId.createFromHexString(req.params.id) });
                if (fcredit) {
                    // Update the existing record
                    if (req.body.credits != null) {
                        fcredit.credits = req.body.credits;
                    }
                    if (req.body.exp_date != null) {
                        fcredit.exp_date = new Date(req.body.exp_date);
                    }
                } else {
                    // Create a new record
                    fcredit = new forumcredits({
                        user_id: req.params.id,
                        credits: req.body.credits,
                        exp_date: req.body.exp_date != null ? new Date(req.body.exp_date) : undefined
                    });
                }
                const editFcredit = await fcredit.save();
                return res.status(200).json(editFcredit);
            }
            if (req.body.type == 'videocounseling') {
                let vcredit = await videocounselingcredits.findOne({ user_id: ObjectId.createFromHexString(req.params.id) });
                if (vcredit) {
                    // Update the existing record
                    if (req.body.credits != null) {
                        vcredit.credits = req.body.credits;
                    }
                    if (req.body.exp_date != null) {
                        vcredit.exp_date = new Date(req.body.exp_date);
                    }
                } else {
                    // Create a new record
                    vcredit = new videocounselingcredits({
                        user_id: req.params.id,
                        credits: req.body.credits,
                        exp_date: req.body.exp_date != null ? new Date(req.body.exp_date) : undefined
                    });
                }
                const editVcredit = await vcredit.save();
                return res.status(200).json(editVcredit);

            } 
            if (req.body.type == 'prediction') {
                let pcredit = await predictioncredits.findOne({ user_id: ObjectId.createFromHexString(req.params.id) });
                if (pcredit) {
                    // Update the existing record
                    if (req.body.credits != null) {
                        pcredit.credits = req.body.credits;
                    }
                    if (req.body.exp_date != null) {
                        pcredit.exp_date = new Date(req.body.exp_date);
                    }
                } else {
                    // Create a new record
                    pcredit = new predictioncredits({
                        user_id: req.params.id,
                        credits: req.body.credits,
                        exp_date: req.body.exp_date != null ? new Date(req.body.exp_date) : undefined
                    });
                }
                const editPcredit = await pcredit.save();
                return res.status(200).json(editPcredit);
            }
            return res.status(400).json({message:'credit not found.'});
            
            
        }
        else
        {
            return res.status(500).json({message:'somthing went wrong.'});
        }
        
        // const vcredit = await videocounselingcredits.findOne({user_id:req.params.id}); 
    }
    catch(err)
    {
        return res.status(500).json({message:err.message});
    }
});

function composemail(user_id)
{
    const html = `<!DOCTYPE html><html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><title></title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><style>
    *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}.image_block img+div{display:none} @media (max-width:520px){.row-content{width:100%!important}.mobile_hide{display:none}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table!important;max-height:none!important}}
    </style></head><body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#bc1823">
    <tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:500px" width="500"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><div class="spacer_block block-1" 
    style="height:60px;line-height:60px;font-size:1px">&#8202;</div><table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="font-family:sans-serif"><div class style="font-size:14px;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p 
    style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:50px;color:#ffffff;"><strong>Career Educators</strong></span></p></div></div></td></tr></table><div class="spacer_block block-3" style="height:40px;line-height:40px;font-size:1px">&#8202;</div></td></tr></tbody></table></td></tr></tbody></table><table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" 
    style="mso-table-lspace:0;mso-table-rspace:0"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:500px" width="500"><tbody><tr><td class="column column-1" width="100%" 
    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tr><td class="pad"><div style="font-family:sans-serif"><div class 
    style="font-size:14px;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:16px;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</span></p></div></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-3" align="center" width="100%" 
    border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:500px" width="500"><tbody><tr><td class="column column-1" width="100%" 
    style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="button_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tr><td class="pad"><div class="alignment" align="center">
    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="http://localhost:4200/verify/${user_id}" style="height:42px;width:160px;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#bc1823"><w:anchorlock/><v:textbox inset="0px,0px,0px,0px"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]-->
    <a href="http://13.50.13.196/verify/${user_id}" target="_blank" style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#bc1823;border-radius:4px;width:auto;border-top:0px solid transparent;font-weight:400;border-right:0px solid transparent;border-bottom:0px solid transparent;border-left:0px solid transparent;padding-top:5px;padding-bottom:5px;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:16px;text-align:center;mso-border-alt:none;word-break:keep-all;"><span style="padding-left:30px;padding-right:30px;font-size:16px;display:inline-block;letter-spacing:normal;"><span dir="ltr" style="word-break: break-word; line-height: 32px;">Click To Verify</span></span></a>
    <!--[if mso]></center></v:textbox></v:roundrect><![endif]--></div></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!-- End --><div style="background-color:transparent;">
        <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                            <!--<![endif]-->

                            
    
                            <!--[if (!mso)&(!IE)]><!-->
                        </div><!--<![endif]-->
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div></body></html>`;

    return html;
}



module.exports = router;