const ranch = require('../models/course');


async function GetCourse(_id)
{
    return await course.find({_id:_id}).populate('branch_id');
}

module.exports = GetCourse;