var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AcadamicYearStatistics = new Schema({
    placement_id: {type: mongoose.Schema.Types.ObjectId,ref:'placement'},
    first_year_total_students_intake: {type: Number},
    total_students_admitted: {type: Number},
    total_graduated_students: {type: Number},
    total_placed_students: {type: Number},
    Total_student_gone_for_higher_studies: {type: Number},
    median_salary: {type: String},
    year: {type: String},
});

AcadamicYearStatistics.pre('remove', async function(next) {
    try {
      await this.model('placement').findByIdAndUpdate({_id:this.placement_id},{'$pull':{acadamic_year_statistics:this._id}},{ useFindAndModify: false });
      next();
    } catch (err) {
      next(err);
    }
});
module.exports = mongoose.model("acadamic_year_statistics", AcadamicYearStatistics);