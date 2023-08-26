var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Videocounselingslot = new Schema({
    from_time: {type: String},
    to_time: {type: String},
    total_slots: {type: Number},
    booked_slots: {type: Number},
    catagory_id: {type: mongoose.Schema.Types.ObjectId,ref:'videocounsellingcatagory'},
});

Videocounselingslot.pre('remove', async function(next) {
    try {
      await this.model('videocounselingStaffallocation').deleteMany({ videocounsellingslot_id: this._id });
      await this.model('videocounselling').deleteMany({ time_and_slot: this._id });
      next();
    } catch (err) {
      next(err);
    }
});

module.exports = mongoose.model("videocounselingslots", Videocounselingslot);