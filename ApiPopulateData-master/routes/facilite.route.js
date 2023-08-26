const express = require('express');
const router = express.Router();
const Facilities = require('../models/facilities');

//get all facilities and get by overview id
router.get('/facilities', async (req, res) => {
    try 
    {
        if(req.query['_id'])
        {
            const filter = {overview_id:req.query['_id']};
            const facilite = await Facilities.findOne(filter);
            return res.json(facilite);
        }
        else
        {
            const facilite = await Facilities.find();
            return res.json(facilite);
        }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

//get single facility by id
router.get('/facilities/:id', getFacility, (req, res) => {
    res.json(res.facility);
  });

//add new facility
router.post('/facilities', async (req, res) => {
    const facility = new Facilities({
        overview_id: req.body.overview_id,
        about:  req.body.about,
        boys_hostel:  req.body.boys_hostel,
        girls_hostel:  req.body.girls_hostel,
        hospital:  req.body.hospital,
        gym:  req.body.gym,
        library:  req.body.library,
        sports:  req.body.sports,
        it_infrastructure:  req.body.it_infrastructure,
        cafitariya:  req.body.cafitariya,
        auditorium:  req.body.auditorium,
        transport:  req.body.transport,
        alumni_assocication:  req.body.alumni_assocication,
        wifi:  req.body.wifi,
        laboratories:  req.body.laboratories,
        guest_room:  req.body.guest_room,
    });

    try {
      const newFacility = await facility.save();
      await Overview.findByIdAndUpdate({_id:req.body.overview_id},{facilitey:newFacility._id});
      res.status(201).json(newFacility);
    } catch (err) {
      res.status(201).json({ message: err.message });
    }
});
//edit facility
router.put('/facilities/:id', getFacility, async (req, res) => {
    if (req.body.about != null) {
      res.facility.about = req.body.about;
    }
    if (req.body.boys_hostel != null) {
      res.facility.boys_hostel = req.body.boys_hostel;
    }
    if (req.body.girls_hostel != null) {
      res.facility.girls_hostel = req.body.girls_hostel;
    }
    if (req.body.hospital != null) {
      res.facility.hospital = req.body.hospital;
    }
    if (req.body.gym != null) {
      res.facility.gym = req.body.gym;
    }
    if (req.body.library != null) {
      res.facility.library = req.body.library;
    }
    if (req.body.sports != null) {
      res.facility.sports = req.body.sports;
    }
    if (req.body.it_infrastructure != null) {
      res.facility.it_infrastructure = req.body.it_infrastructure;
    }
    if (req.body.cafitariya != null) {
      res.facility.cafitariya = req.body.cafitariya;
    }
    if (req.body.auditorium != null) {
      res.facility.auditorium = req.body.auditorium;
    }
    if (req.body.transport != null) {
      res.facility.transport = req.body.transport;
    }
    if (req.body.alumni_assocication != null) {
      res.facility.alumni_assocication = req.body.alumni_assocication;
    }
    if (req.body.wifi != null) {
      res.facility.wifi = req.body.wifi;
    }
    if (req.body.laboratories != null) {
      res.facility.laboratories = req.body.laboratories;
    }
    if (req.body.guest_room != null) {
      res.facility.guest_room = req.body.guest_room;
    }

    try {
      const editFacility = await res.facility.save();
      res.json(editFacility);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

//delete facility
router.delete('/facilities/:id', getFacility, async (req, res) => {
    try {
      await res.facility.remove();
      res.json({ message: 'facility deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});   


async function getFacility(req, res, next) {
try {
    const facility = await Facilities.findById(req.params.id);
    if (facility == null) {
    return res.status(201).json({ message: 'Cannot find facility' });
    }
    res.facility = facility;
    next();
} catch (err) {
    return res.status(500).json({ message: err.message });
}
}  

module.exports = router;