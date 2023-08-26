var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Videocounselling = new Schema({
    counselling_date: {type: Date},
    time_and_slot: {type: mongoose.Schema.Types.ObjectId,ref:'videocounselingslots'},
    catagory_id: {type: mongoose.Schema.Types.ObjectId,ref:'videocounsellingcatagory'},
    user_id: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    status:{type:String,default : "pending"},
    link:{type:String,default : ""},
    created_on:{type:Date,default : Date.now()}
});

Videocounselling.pre('remove', async function(next) {
    try {
      await this.model('videocounselingStaffallocation').deleteMany({ videocounselling_id: this._id });
      next();
    } catch (err) {
      next(err);
    }
});

module.exports = mongoose.model("videocounselling", Videocounselling);