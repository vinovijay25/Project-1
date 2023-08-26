var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlacementStatistics = new Schema({
    placement_id: {type: mongoose.Schema.Types.ObjectId,ref:'placement'},
    total_number_of_offers: {type: Number},
    number_of_companies_visited: {type: Number},
    number_of_students_placed: {type: Number},
    number_of_super_dream_offers: {type: Number},
    number_of_dream_offers: {type: Number},
    average_salary_offered: {type: String},
    year: {type: String},
});

PlacementStatistics.pre('remove', async function(next) {
    try {
      await this.model('placement').findByIdAndUpdate({_id:this.placement_id},{'$pull':{placement_statistics:this._id}},{ useFindAndModify: false });
      next();
    } catch (err) {
      next(err);
    }
});
module.exports = mongoose.model("placement_statistics", PlacementStatistics);