const express = require('express');
const router = express.Router();
const userOtp = require('../models/otp.js');

router.post('/otp',async (req,res)=>{

    try
    {
        if(req.body.mobile_or_email)
        {
            const mobile_or_email = req.body.mobile_or_email;
            const _userOtp = await userOtp.findOne({mobile_or_email:mobile_or_email});
            const respons = mobile_or_email.includes('@')?'email':'mobile';
            if(_userOtp != null)
            {
                _userOtp.otp = await GenerateOTP();
                _userOtp.expiresAt = Date.now() + 300000;
                const newUserOtp = await _userOtp.save();
                return res.status(200).json(_userOtp);
            }
            else
            {
                const otp = await GenerateOTP();
                const _userOtp = new userOtp({
                    otp:otp,
                    mobile_or_email:mobile_or_email,
                    expiresAt: Date.now() + 300000
                });
                const newUserOtp = await _userOtp.save();
                return res.status(200).json(newUserOtp);
            }
        }
        else
        {
            return res.status(404).json({message:"mobile_or_email is empty"});
        }
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});

router.post('/otp-verify',async (req,res)=>{
    try
    {
        if(req.body.otp && req.body.mobile_or_email)
        {
            const _userOtp = await userOtp.findOne({mobile_or_email:req.body.mobile_or_email});
            if(_userOtp)
            {
                if(_userOtp.otp == req.body.otp)
                {
                    return res.status(200).json({message:'verification success'});
                }
                else
                {
                    return res.status(404).json({message:'invalid otp'});
                }
            }
            else
            {
                return res.status(404).json({message:'otp expaired'});
            }
        }
        else
        {
            return res.status(404).json({message:'invalid details'});
        }
    }
    catch(err)
    {
        res.status(500).json({message:err.message});
    }
});

async function SendOTP(mobile_or_email)
{
    if(mobile_or_email)
    {
        const mobile_or_email = req.body.mobile_or_email;
        const _userOtp = await userOtp.findOne({mobile_or_email:mobile_or_email});
        const respons = mobile_or_email.includes('@')?'email':'mobile';
        if(_userOtp != null)
        {
            _userOtp.otp = await GenerateOTP();
            _userOtp.expiresAt = Date.now() + 300000;
            const newUserOtp = await _userOtp.save();
            return _userOtp;
        }
        else
        {
            const otp = await GenerateOTP();
            const _userOtp = new userOtp({
                otp:otp,
                mobile_or_email:mobile_or_email,
                expiresAt: Date.now() + 300000
            });
            const newUserOtp = await _userOtp.save();
            return newUserOtp;
        }
    }
    else
    {
        return {message:"mobile_or_email is empty"};
    }
}

async function GenerateOTP() 
{
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    this.otp = otp;
    return otp;
};

module.exports = router;