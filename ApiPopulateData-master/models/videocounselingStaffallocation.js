var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VideocounselingStaffallocation = new Schema({
    // user_id: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    videocounselling_id: {type: mongoose.Schema.Types.ObjectId,ref:'videocounselling'},
    videocounsellingslot_id: {type: mongoose.Schema.Types.ObjectId,ref:'videocounselingslots'},
    adminuser_id: {type: mongoose.Schema.Types.ObjectId,ref:'adminusers'},
    // staffallocation: {type: String},
    created_on:{type:Date,default : Date.now()}
});



module.exports = mongoose.model("videocounselingStaffallocation",  VideocounselingStaffallocation);