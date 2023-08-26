const Overview = require('../models/Overview');
const Branch = require('../models/branch');
const Course = require('../models/course');

async function Predict(type,tnea_rank,course_Fee_structure,caste_group,sub_caste)
{

    const _overviews = await Overview.find().populate({path: 'cutoff_id',populate: {path: 'course_id',populate: {path: 'branch_id'}}});
    var result = [];
    _overviews.forEach(overview => {
        var overviewData = [];
        var good_chance_course = [];
        var may_get_course = [];
        var tough_chance_course = [];
        overview.cutoff_id.forEach(cuttoff => {
            if(type == 'Cutoff')
            {
                switch (caste_group) 
                {
                    case 'OC':
                        if(tnea_rank > cuttoff.oc && cuttoff.oc != null)
                        {
                            good_chance_course.push({cutoff:cuttoff.oc,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank == cuttoff.oc && cuttoff.oc != null)
                        {
                            may_get_course.push({cutoff:cuttoff.oc,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank < cuttoff.oc && cuttoff.oc != null)
                        {
                            tough_chance_course.push({cutoff:cuttoff.oc,course_id:cuttoff.course_id});
                        }
                        break;
                    case 'BC':
                        if(sub_caste == 'NA')
                        {
                            if(tnea_rank > cuttoff.bc && cuttoff.bc != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.bc,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.bc && cuttoff.bc != null)
                            {
                                may_get_course.push({cutoff:cuttoff.bc,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank < cuttoff.bc && cuttoff.bc != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.bc,course_id:cuttoff.course_id});
                            }
                        }
                        else if(sub_caste == 'MBC')
                        {
                            if(tnea_rank > cuttoff.mbc && cuttoff.mbc != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.mbc,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.mbc && cuttoff.mbc != null)
                            {
                                may_get_course.push({cutoff:cuttoff.mbc,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank < cuttoff.mbc && cuttoff.mbc != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.mbc,course_id:cuttoff.course_id});
                            }
                        }
                        else if(sub_caste == 'BCM')
                        {
                            if(tnea_rank > cuttoff.bcm && cuttoff.bcm != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.bcm,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.bcm && cuttoff.bcm != null)
                            {
                                may_get_course.push({cutoff:cuttoff.bcm,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank < cuttoff.bcm && cuttoff.bcm != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.bcm,course_id:cuttoff.course_id});
                            }
                        }
                        break;
                    case 'SC':
                        if(sub_caste == 'NA')
                        {
                            if(tnea_rank > cuttoff.sc && cuttoff.sc != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.sc,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.sc && cuttoff.sc != null)
                            {
                                may_get_course.push({cutoff:cuttoff.sc,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank < cuttoff.sc && cuttoff.sc != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.sc,course_id:cuttoff.course_id});
                            }
                        }
                        else if(sub_caste == 'SCA')
                        {
                            if(tnea_rank > cuttoff.sca && cuttoff.sca != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.sca,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.sca && cuttoff.sca != null)
                            {
                                may_get_course.push({cutoff:cuttoff.sca,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank < cuttoff.sca && cuttoff.sca != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.sca,course_id:cuttoff.course_id});
                            }
                        }
                        break;
                    case 'ST':
                        if(tnea_rank > cuttoff.st && cuttoff.st != null)
                        {
                            good_chance_course.push({cutoff:cuttoff.st,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank == cuttoff.st && cuttoff.st != null)
                        {
                            may_get_course.push({cutoff:cuttoff.st,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank < cuttoff.st && cuttoff.st != null)
                        {
                            tough_chance_course.push({cutoff:cuttoff.st,course_id:cuttoff.course_id});
                        }
                        break;
                    default:
                        break;
                }
            }
            else
            {
                switch (caste_group) 
                {
                    case 'OC':
                        if(tnea_rank < cuttoff.oc_rank && cuttoff.oc_rank != null)
                        {
                            good_chance_course.push({cutoff:cuttoff.oc_rank,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank == cuttoff.oc_rank && cuttoff.oc_rank != null)
                        {
                            may_get_course.push({cutoff:cuttoff.oc_rank,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank > cuttoff.oc_rank && cuttoff.oc_rank != null)
                        {
                            tough_chance_course.push({cutoff:cuttoff.oc_rank,course_id:cuttoff.course_id});
                        }
                        break;
                    case 'BC':
                        if(sub_caste == 'NA')
                        {
                            if(tnea_rank < cuttoff.bc_rank && cuttoff.bc_rank != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.bc_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.bc_rank && cuttoff.bc_rank != null)
                            {
                                may_get_course.push({cutoff:cuttoff.bc_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank > cuttoff.bc_rank && cuttoff.bc_rank != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.bc_rank,course_id:cuttoff.course_id});
                            }
                        }
                        else if(sub_caste == 'MBC')
                        {
                            if(tnea_rank < cuttoff.mbc_rank && cuttoff.mbc_rank != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.mbc_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.mbc_rank && cuttoff.mbc_rank != null)
                            {
                                may_get_course.push({cutoff:cuttoff.mbc_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank > cuttoff.mbc_rank && cuttoff.mbc_rank != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.mbc_rank,course_id:cuttoff.course_id});
                            }
                        }
                        else if(sub_caste == 'BCM')
                        {
                            if(tnea_rank < cuttoff.bcm_rank && cuttoff.bcm_rank != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.bcm_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.bcm_rank && cuttoff.bcm_rank != null)
                            {
                                may_get_course.push({cutoff:cuttoff.bcm_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank > cuttoff.bcm_rank && cuttoff.bcm_rank != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.bcm_rank,course_id:cuttoff.course_id});
                            }
                        }
                        break;
                    case 'SC':
                        if(sub_caste == 'NA')
                        {
                            if(tnea_rank < cuttoff.sc_rank && cuttoff.sc_rank != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.sc_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.sc_rank && cuttoff.sc_rank != null)
                            {
                                may_get_course.push({cutoff:cuttoff.sc_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank > cuttoff.sc_rank && cuttoff.sc_rank != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.sc_rank,course_id:cuttoff.course_id});
                            }
                        }
                        else if(sub_caste == 'SCA')
                        {
                            if(tnea_rank < cuttoff.sca_rank && cuttoff.sca_rank != null)
                            {
                                good_chance_course.push({cutoff:cuttoff.sca_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank == cuttoff.sca_rank && cuttoff.sca_rank != null)
                            {
                                may_get_course.push({cutoff:cuttoff.sca_rank,course_id:cuttoff.course_id});
                            }
                            if(tnea_rank > cuttoff.sca_rank && cuttoff.sca_rank != null)
                            {
                                tough_chance_course.push({cutoff:cuttoff.sca_rank,course_id:cuttoff.course_id});
                            }
                        }
                        break;
                    case 'ST':
                        if(tnea_rank < cuttoff.st_rank && cuttoff.st_rank != null)
                        {
                            good_chance_course.push({cutoff:cuttoff.st_rank,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank == cuttoff.st_rank && cuttoff.st_rank != null)
                        {
                            may_get_course.push({cutoff:cuttoff.st_rank,course_id:cuttoff.course_id});
                        }
                        if(tnea_rank > cuttoff.st_rank && cuttoff.st_rank != null)
                        {
                            tough_chance_course.push({cutoff:cuttoff.st_rank,course_id:cuttoff.course_id});
                        }
                        break;
                    default:
                        break;
                }
            }
        });  
        overviewData = {
            overview_id:overview._id,
            college_name:overview.college_name,
            college_code:overview.college_code,
            city:overview.city,
            state:overview.state,
            pri_gov:overview.pri_gov,
            autononous_stus:overview.autononous_stus,
            good_chance:good_chance_course,
            may_get:may_get_course,
            tough_chance:tough_chance_course,
        };           
        result.push(overviewData);
    });
    return result;
}
 


module.exports = Predict;


