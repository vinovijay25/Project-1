const acadamic_rank = require('../models/academic_rank');

async function Predict(cutoff,caste_group)
{
    cutoff = Math.round(cutoff);
    let from_rank = 0;
    let to_rank = 0;
    
    const data = await acadamic_rank.find({cutoff:cutoff,community:caste_group});
    
    if(data.length > 0)
    {
        if(caste_group == "OC")
        {
            from_rank = data[0].rank;
            to_rank = data[data.length - 1].rank;
        }
        else
        {
            from_rank = data[0].community_rank;
            to_rank = data[data.length - 1].community_rank;
        }
    }

    
    const result = {
        cutoff:cutoff,
        category:caste_group,
        from_rank:from_rank,
        to_rank:to_rank
    };
    return result;
}

module.exports = Predict;