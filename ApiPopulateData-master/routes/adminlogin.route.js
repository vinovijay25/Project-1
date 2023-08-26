const express = require('express');
const router = express.Router();
const Adminusers = require('../models/adminusers');
const verifyPassword = require('../utils/verifyPassword');

//Admin login username & password
router.post('/adminlogin',getAdminuser,async(req,res)=>
{
    try 
    {
        res.status(200).json(res.adminuser);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getAdminuser(req, res, next) {
    if(req.body.password != null)
    {   
        try
        {

            const user = await Adminusers.findOne({'$or' :[{username:req.body.username_or_email},{email:req.body.username_or_email}]});
            const password = user.password;
            //check hash password
            if(!await verifyPassword(req.body.password,password))
            {
                return res.status(404).json({ message: 'wrong password' });
            }
            try {
                const adminuser = await Adminusers.findOne({_id:user._id}).populate("role");
                if (adminuser == null) {
                    return res.status(404).json({ message: 'Cannot find adminuser' });
                }
                res.adminuser = adminuser;
                next();
            } catch (err) {
                return res.status(500).json({ message: err.message });
            }
        }
        catch(err)
        {
            return res.status(404).json({ message: 'Cannot find adminuser' });
        }
    }
}

module.exports = router;