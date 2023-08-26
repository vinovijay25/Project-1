var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Placement = new Schema({
    overview_id: {type: mongoose.Schema.Types.ObjectId,ref:'overview'},
    created_on:{type:Date,default : Date.now()},
    about: {type: String},
    placement_statistics: [{type: mongoose.Schema.Types.ObjectId,ref:'placement_statistics'}],
    acadamic_year_statistics: [{type: mongoose.Schema.Types.ObjectId,ref:'acadamic_year_statistics'}],
    toprecruiters: [{type: String}],
});
Placement.pre('remove', async function(next) {
    try {
      await this.model('placement_statistics').deleteMany({ placement_id: this._id });
      await this.model('acadamic_year_statistics').deleteMany({ placement_id: this._id });
      next();
    } catch (err) {
      next(err);
    }
});
module.exports = mongoose.model("placement", Placement);