
const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
// get all settings
router.get('/settings', async (req, res) => {
    try {
      const settings = await Setting.find();
      res.json(settings);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // get a single setting
  router.get('/settings/:id', getSetting, (req, res) => {
    res.json(res.setting);
  });
  
  // create a new setting
  router.post('/settings', async (req, res) => {
    const setting = new Setting({
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      option5: req.body.option5,
    });

    try {
      const newSetting = await setting.save();
      res.status(201).json(newSetting);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // update an setting
  router.put('/settings/:id', getSetting, async (req, res) => {
    if (req.body.option1 != null) {
      res.setting.option1 = req.body.option1;
    }
    if (req.body.option2 != null) {
      res.setting.option2 = req.body.option2;
    }
    if (req.body.option3 != null) {
      res.setting.option3 = req.body.option3;
    }  
    if (req.body.option4 != null) {
      res.setting.option4 = req.body.option4;
    }
    if (req.body.option5 != null) {
      res.setting.option5 = req.body.option5;
    }
    try {
      const updatedSetting = await res.setting.save();
      res.json(updatedSetting);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // delete an setting
  router.delete('/settings/:id', getSetting, async (req, res) => {
    try {
      await res.setting.remove();
      res.json({ message: 'Setting deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getSetting(req, res, next) {
    try {
      const setting = await Setting.findById(req.params.id);
      if (setting == null) {
        return res.status(404).json({ message: 'Cannot find setting' });
      }
      res.setting = setting;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }  
  
  
  const settingRoute = router;
module.exports = settingRoute;

