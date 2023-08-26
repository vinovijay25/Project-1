const express = require('express');
const router = express.Router();
const Overview = require('../models/Overview');
const Course = require('../models/course');
const Cutoff = require('../models/cutoff');
const Branch = require('../models/branch');
const Facilities = require('../models/facilities');
const Placement = require('../models/placement');
const PlacementStat = require('../models/placement_statistics');
const AcadamicRank = require('../models/academic_rank');

router.post('/upload_college_data/overview',async (req,res)=>
{
    try 
    {
        const college = await Overview.findOne({college_code:req.body.college_code});
        if(college == null)
        {
            const overview = new Overview({
                college_type: req.body. college_type,
                university_type: req.body.university_type,
                email: req.body.email,
                college_name: req.body.college_name,
                college_code: req.body.college_code,
                pri_gov: req.body.pri_gov,
                city: req.body.city,
                state: req.body.state,
                about: req.body.about,
                year: req.body.year,
                total_branch: req.body.total_branch,
                approved_intake: req.body.approved_intake,
                autononous_stus: req.body.autononous_stus,
                addmission_auth: req.body.addmission_auth,
                address: req.body.address,
                zipcode: req.body.zipcode,
                cutoff_id: req.body.cutoff_id,
                course_id: req.body.course_id,
              });
              const newoverview = await overview.save();
            return res.status(201).json(newoverview);
        }
        else
        {
            return res.status(400).json({ message: "this college already taken." });
        }
    }
    catch(err)
    {
        return res.status(400).json({ message: err.message });
    }
});
router.post('/upload_college_data/course',async (req,res)=>
{
    try 
    {
        const college = await Overview.findOne({college_code:req.body.college_code});
        if(college != null)
        {
            const _branch = await Branch.findOne({branchcode:req.body.branch_code});
            if(_branch != null)
            {
                const _course = await Course.findOne({overview_id:college._id,branch_id:_branch._id});
                if(_course == null)
                {
                    const course = new Course({
                        overview_id: college._id,
                        branch_code: req.body.branch_code,
                        branch_id: _branch._id,
                        branch_approve: req.body.branch_approve,
                        duration: req.body.duration,
                        branch_year: req.body.branch_year,
                        nba_acc: req.body.nba_acc,
                        acc_valid: req.body.acc_valid,
                        timings: req.body.timings,
                        total_fees: req.body.total_fees,
                        naac_acc: req.body.naac_acc,
                        nrf_rank: req.body.nrf_rank,
                        valid_upto: req.body.valid_upto,
                      });
                    const newCourse = await course.save();
                    await Overview.findByIdAndUpdate({_id:college._id},{'$push':{course_id:newCourse._id}},{ useFindAndModify: false });
                    return res.status(201).json(newCourse);
                }
                else
                {
                    return res.status(500).json({ message: "this branch already taken." });
                }
            }
            else
            {
                return res.status(500).json({ message: "branch not found." });
            }
        }
        else
        {
            return res.status(500).json({ message: "college not found." });
        }
    }
    catch(err)
    {
        return res.status(500).json({ message: err.message });
    }
});

router.post('/upload_college_data/cutoff',async (req,res)=>
{
    try
    {
        const college = await Overview.findOne({college_code:req.body.college_code});
        if(college != null)
        {
            const _branch = await Branch.findOne({branchcode:req.body.branch_code});
            if(_branch != null)
            {
                const _course = await Course.findOne({overview_id:college._id,branch_id:_branch._id});
                if(_course != null)
                {
                    const _cutoff = await Cutoff.findOne({overview_id:college._id,course_id:_course._id,cutof_year:req.body.year});
                    if(_cutoff == null)
                    {
                        const cutoff = new Cutoff({
                            overview_id: college._id,
                            course_id: _course._id,
                            cutof_year: req.body.year,
                        });
                        if (req.body.bc_mark != null) {
                            cutoff.bc = req.body.bc_mark;
                        }
                        else
                        {
                            cutoff.bc = null;
                        }
                        if (req.body.bcm_mark != null) {
                            cutoff.bcm = req.body.bcm_mark;
                        }
                        else
                        {
                            cutoff.bcm = null;
                        }
                        if (req.body.mbc_mark != null) {
                            cutoff.mbc = req.body.mbc_mark;
                        }
                        else
                        {
                            cutoff.mbc = null;
                        }
                        if (req.body.oc_mark != null) {
                            cutoff.oc = req.body.oc_mark;
                        }
                        else
                        {
                            cutoff.oc = null;
                        }
                        if (req.body.sc_mark != null) {
                            cutoff.sc = req.body.sc_mark;
                        }
                        else
                        {
                            cutoff.sc = null;
                        }
                        if (req.body.sca_mark != null) {
                            cutoff.sca = req.body.sca_mark;
                        }
                        else
                        {
                            cutoff.sca = null;
                        }
                        if (req.body.st_mark != null) {
                            cutoff.st = req.body.st_mark;
                        }
                        else
                        {
                            cutoff.st = null;
                        }
                        if (req.body.bc_rank != null) {
                            cutoff.bc_rank = req.body.bc_rank;
                        }
                        else
                        {
                            cutoff.bc_rank = null;
                        }
                        if (req.body.bcm_rank != null) {
                            cutoff.bcm_rank = req.body.bcm_rank;
                        }
                        else
                        {
                            cutoff.bcm_rank = null;
                        }
                        if (req.body.mbc_rank != null) {
                            cutoff.mbc_rank = req.body.mbc_rank;
                        }
                        else
                        {
                            cutoff.mbc_rank = null;
                        }
                        if (req.body.oc_rank != null) {
                            cutoff.oc_rank = req.body.oc_rank;
                        }
                        else
                        {
                            cutoff.oc_rank = null;
                        }
                        if (req.body.sc_rank != null) {
                            cutoff.sc_rank = req.body.sc_rank;
                        }
                        else
                        {
                            cutoff.sc_rank = null;
                        }
                        if (req.body.sca_rank != null) {
                            cutoff.sca_rank = req.body.sca_rank;
                        }
                        else
                        {
                            cutoff.sca_rank = null;
                        }
                        if (req.body.st_rank != null) {
                            cutoff.st_rank = req.body.st_rank;
                        }
                        else
                        {
                            cutoff.st_rank = null;
                        }

                        const newCutoff = await cutoff.save();
                        await Overview.findByIdAndUpdate({_id:college._id},{'$push':{cutoff_id:newCutoff._id}},{ useFindAndModify: false });
                        res.status(200).json(newCutoff);
                    }
                    else
                    {
                        return res.status(400).json({ message: "cutoff alreadt taken." });
                    }
                }
                else
                {
                    return res.status(400).json({ message: "course not found." });
                }
            }
            else
            {
                return res.status(400).json({ message: "branch not found." });
            }
        }
        else
        {
            return res.status(400).json({ message: "college not found." });
        }
    }
    catch(err)
    {
        return res.status(400).json({message:err.message});
    }
});

router.post('/upload_college_data/facility',async (req,res)=>
{
    try
    {
        const college = await Overview.findOne({college_code:req.body.college_code});
        if(college != null)
        {
            const _facilities = await Facilities.findOne({overview_id:college._id});
            if(_facilities == null)
            {
                const facility = new Facilities({
                    overview_id: college._id,
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
                const newFacility = await facility.save();
                await Overview.findByIdAndUpdate({_id:college._id},{facilites:newFacility._id});
                return res.status(200).json(newFacility);
            }
            else
            {
                return res.status(400).json({ message: "facilities already taken." });
            }
        }
        else
        {
            return res.status(400).json({ message: "college not found." });
        }
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
});

router.post('/upload_college_data/placement',async (req,res)=>
{
    try
    {
        const college = await Overview.findOne({college_code:req.body.college_code});
        if(college != null)
        {
            const _placement = await Placement.findOne({overview_id:college._id});
            if(_placement == null)
            {
                const placement = new Placement({
                    overview_id:college._id,
                    about:req.body.about,
                    toprecruiters:req.body.toprecruiters,
                });
                const newPlacement = await placement.save();
                await Overview.findByIdAndUpdate({_id:college._id},{placement:newPlacement._id});
                return res.status(200).json(newPlacement);
            }
            else
            {
                return res.status(400).json({ message: "placement already taken." });
            }
            
        }
        else
        {
            return res.status(400).json({ message: "college not found." });
        }
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
});
router.post('/upload_college_data/placement-stat',async (req,res)=>
{
    try
    {
        const college = await Overview.findOne({college_code:req.body.college_code});
        if(college != null)
        {
            const _placement = await Placement.findOne({overview_id:college._id});
            if(_placement != null)
            {
                const _placementStat = await PlacementStat.findOne({placement_id:_placement._id,year:req.body.year});
                if(_placementStat == null)
                {
                    const placementStat = new PlacementStat({
                        placement_id:_placement._id,
                        total_number_of_offers:req.body.total_number_of_offers,
                        number_of_companies_visited:req.body.number_of_companies_visited,
                        number_of_students_placed:req.body.number_of_students_placed,
                        number_of_super_dream_offers:req.body.number_of_super_dream_offers,
                        average_salary_offered:req.body.average_salary_offered,
                        year:req.body.year,
                    });
                    const newPlacementStat = await placementStat.save();
                    await Placement.findByIdAndUpdate({_id:newPlacementStat.placement_id},{'$push':{placement_statistics:newPlacementStat._id}},{ useFindAndModify: false });
                    return res.status(200).json(newPlacementStat);
                }
                else
                {
                    return res.status(400).json({ message: "placement stat already taken." });
                }
            }
            else
            {
                return res.status(400).json({ message: "placement not found." });
            }            
        }
        else
        {
            return res.status(400).json({ message: "college not found." });
        }
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
});


router.post('/upload_college_data/acadamic-ranks',async(req,res)=>{
    try
    {
        // const data = await AcadamicRank.remove();
        const acadamicrank = new AcadamicRank({
            rank:req.body.rank,
            cutoff:req.body.cutoff,
            community:req.body.community,
            community_rank:req.body.community_rank
        })
        const newacadamicrank = await acadamicrank.save();
        return res.status(200).json(newacadamicrank);
    }
    catch(err)
    {
        res.status(400).json({message:err.message});
    }
});

module.exports = router;