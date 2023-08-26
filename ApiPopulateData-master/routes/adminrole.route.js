const express = require('express');
const router = express.Router();
const Adminroles = require('../models/adminroles');

//Get all admin roles
router.get('/adminroles',async (req,res)=>
{
    try
    {
        const adminroles = await Adminroles.find();
        res.json(adminroles);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
//Get one admin role by id
router.get('/adminroles/:id',getAdminrole,(req,res)=>
{
    res.json(res.adminrole);
});
//Add new admin role
router.post('/adminroles',async(req,res)=>
{
    const _adminrole = new Adminroles(
        {
            name:req.body.name,
            modules:req.body.modules,
            privilages:req.body.privilages,
        }
    );
    try 
    {
        const newAdminrole = await _adminrole.save();
        res.status(201).json(newAdminrole);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
//Edit adminrole
router.put('/adminroles/:id',getAdminrole,async (req,res)=>
{
    if(req.body.name != null)
    {
        res.adminrole.name = req.body.name;
    }
    if(req.body.modules != null)
    {
        res.adminrole.modules = req.body.modules;
    }
    if(req.body.privilages != null)
    {
        res.adminrole.privilages = req.body.privilages;
    }
    try 
    {
        const editAdminrole = res.adminrole.save();
        res.json(editAdminrole);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});
router.delete('/adminroles/:id',getAdminrole,async (req,res)=>
{
    try 
    {
        await res.adminrole.remove();
        res.json({ message: 'adminrole deleted' });
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getAdminrole(req, res, next) {
    try {
      const adminrole = await Adminroles.findById(req.params.id);
      if (adminrole == null) {
          return res.status(404).json({ message: 'Cannot find adminrole' });
        }
      res.adminrole = adminrole;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  } 


module.exports = router;