const express = require('express');
const ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const Adminusers = require('../models/adminusers');
const hashPassword = require('../utils/hashPassword');

//Get all admin users
router.get('/adminusers',async (req,res)=>
{
    try
    {
        const adminusers = await Adminusers.aggregate([
            {
                $lookup:
                {
                    from:'adminroles',
                    localField:'role',
                    foreignField:'_id',
                    as:'role'
                }
            },
            {
                $project:
                {
                    _id:1,
                    username:1,
                    email:1,
                    phone:1,
                    role:{
                            id:{'$arrayElemAt':['$role._id',0]},
                            name:{'$arrayElemAt':['$role.name',0]},
                            modules:{'$arrayElemAt':['$role.modules',0]},
                            privilages:{'$arrayElemAt':['$role.privilages',0]},
                        }
                }
            }
        ]);
        res.json(adminusers);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Get one admin users by id
router.get('/adminusers/:id',getAdminuser,async(req,res)=>
{
    res.json(res.adminuser);
});
//Add new admin user
router.post('/adminusers',async(req,res)=>
{
    try 
    {
        const adminusers = new Adminusers(
            {
              username:req.body.username,
              email:req.body.email,
              phone:req.body.phone,
              password:await hashPassword(req.body.password),
              role:req.body.role,
            }
        );
        const newAdminusers = await adminusers.save();
        res.status(201).json(newAdminusers);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
//Edit adminrole
router.put('/adminusers/:id',actionAdminuser,async (req,res)=>
{
    if(req.body.username != null)
    {
        res.adminuser.username = req.body.username;
    }
    if(req.body.email != null)
    {
        res.adminuser.email = req.body.email;
    }
    if(req.body.phone != null)
    {
        res.adminuser.phone = req.body.phone;
    }
    if(req.body.password != null)
    {
        res.adminuser.password = await hashPassword(req.body.password);
    }
    if(req.body.role != null)
    {
        res.adminuser.role = req.body.role;
    }
    try 
    {
        const editAdminuser= res.adminuser.save();
        res.json(editAdminuser);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/adminusers/:id',actionAdminuser,async (req,res)=>
{
    try 
    {
        await res.adminuser.remove();
        res.json({ message: 'adminuser deleted' });
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getAdminuser(req, res, next) {
    try {
      const adminuser = await Adminusers.aggregate([
        {
            $match:
            {
                _id:ObjectId.createFromHexString(req.params.id),
            }
        },
        {
            $lookup:
            {
                from:'adminroles',
                localField:'role',
                foreignField:'_id',
                as:'role'
            }
        },
        {
            $project:
                {
                    _id:1,
                    username:1,
                    email:1,
                    phone:1,
                    role:{
                            id:{'$arrayElemAt':['$role._id',0]},
                            name:{'$arrayElemAt':['$role.name',0]},
                            modules:{'$arrayElemAt':['$role.modules',0]},
                            privilages:{'$arrayElemAt':['$role.privilages',0]},
                        }
                }
        }
    ]);
      if (adminuser.length <= 0) {
          return res.status(404).json({ message: 'Cannot find adminuser' });
        }
      res.adminuser = adminuser[0];
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 

  async function actionAdminuser(req, res, next) {
    try {
      const adminuser = await Adminusers.findById(req.params.id);
      if (adminuser == null) {
          return res.status(404).json({ message: 'Cannot find adminuser' });
        }
      res.adminuser = adminuser;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 


module.exports = router;