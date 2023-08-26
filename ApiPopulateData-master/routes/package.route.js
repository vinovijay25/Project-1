const express = require('express');
const router = express.Router();
const Packages = require('../models/package');
const ObjectId = require('mongodb').ObjectId;
const forumcredits = require('../models/forumcredits');
const videocounselingcredits = require('../models/videocounselingcredits');
const predictioncredits = require('../models/predictioncredits');

// get all packages
router.get('/packages', async (req, res) => {
  if(req.query['type'] && req.query['type'] != null)
  {
    try {
      const packages = await Packages.find({type:req.query['type']});
      return res.json(packages);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
    try {
      const packages = await Packages.find();
      return res.json(packages);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });
  
  // get a single package
  router.get('/packages/:id', getPackage, (req, res) => {
    res.json(res.package);
  });
  
  // create a new packages
  router.post('/packages', async (req, res) => {
    
    const package = new Packages({
      name: req.body.name,
      discription: req.body.discription,
      price: req.body.price,
      credits: req.body.credits,
      unlimited: req.body.unlimited,
      validity: req.body.validity,
      type: req.body.type,
      packages: req.body.packages,
      status: req.body.status
    });

    try {
      const newPackages = await package.save();
      res.status(201).json(newPackages);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // update an packages
  router.put('/packages/:id', getPackage, async (req, res) => {
    if (req.body.name != null) {
      res.package.name = req.body.name;
    }
    if (req.body.discription != null) {
      res.package.discription = req.body.discription;
    }
    if (req.body.price != null) {
      res.package.price = req.body.price;
    }
    if (req.body.credits != null) {
      res.package.credits = req.body.credits;
    }
    if (req.body.unlimited != null) {
      res.package.unlimited = req.body.unlimited;
    }
    if (req.body.type != null) {
      res.package.type = req.body.type;
    }
    if (req.body.packages != null) {
      res.package.packages = req.body.packages;
    }
    if (req.body.validity != null) {
      res.package.validity = req.body.validity;
    }
    if (req.body.status != null) {
      res.package.status = req.body.status;
    }
    try {
      const updatedPackage = await res.package.save();
      res.json(updatedPackage);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // delete an packages
  router.delete('/packages/:id', getPackage, async (req, res) => {
    try {
      await res.package.remove();
      res.json({ message: 'package deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getPackage(req, res, next) {
    try {
      const package = await Packages.findById(req.params.id);
      if (package == null) {
        return res.status(404).json({ message: 'Cannot find package' });
      }
      res.package = package;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }  

  router.post('/payment/verify',async (req,res)=>{
    const order_id = req.body.order_id;
    const package = await Packages.findById({_id:order_id});

    const creditsList = [];
    creditsList.push(await forumcredits.findOne({ user_id: req.body.user_id}));
    creditsList.push(await videocounselingcredits.findOne({ user_id: req.body.user_id}));
    creditsList.push(await predictioncredits.findOne({ user_id: req.body.user_id}));
    // console.log(fcredit);
    for(let i in package.packages)
    {
      // const currentDate = new Date();
      // const date = currentDate.setDate(currentDate.getDate() + package.validity);
      const currentDate = new Date();
      const exp_date = new Date(currentDate.getTime() + (package.validity * 24 * 60 * 60 * 1000));

      if(creditsList[i])
      {
        if(package.unlimited[i])
        {
          creditsList[i].unlimited = package.unlimited[i];
          creditsList[i].exp_date = exp_date;
          creditsList[i].save();
        }
        else
        {
          creditsList[i].unlimited = package.unlimited[i];
          creditsList[i].credits += package.credits[i];
          creditsList[i].exp_date = exp_date;
          creditsList[i].save();
        }
      }
      else
      {
        if(i == 0)
        {
          creditsList[i] = new forumcredits({
            user_id: req.body.user_id,
            credits: package.credits[i],
            unlimited: package.unlimited[i],
            exp_date: exp_date != null ? exp_date : undefined
          });
        }
        else if(i == 1)
        {
          creditsList[i] = new videocounselingcredits({
            user_id: req.body.user_id,
            credits: package.credits[i],
            unlimited: package.unlimited[i],
            exp_date: exp_date != null ? exp_date : undefined
          });
        }
        else if(i == 2)
        {
          creditsList[i] = new predictioncredits({
            user_id: req.body.user_id,
            credits: package.credits[i],
            unlimited: package.unlimited[i],
            exp_date: exp_date != null ? exp_date : undefined
          });
        }
        creditsList[i].save();
      }
    }

    res.status(200).json(package);
  });
  
  
const packageRoute = router;
module.exports = packageRoute;











