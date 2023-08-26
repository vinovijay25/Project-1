var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AcademicRank = new Schema({
    rank: {type: Number},
    cutoff: {type: Number},
    community: {type: String},
    community_rank: {type: Number},
});

module.exports = mongoose.model("academic_rank", AcademicRank);