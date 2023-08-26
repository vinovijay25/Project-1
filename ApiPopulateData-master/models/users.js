var mongoose = require('mongoose');
const forumcredits = require('./forumcredits');
const videocounselingcredits = require('./videocounselingcredits');

var Schema = mongoose.Schema;
var Users = new Schema({
    name: {type: String},
    email: {type: String},
    phone: {type: String},
    studyingIn: {type: String},
    educationInterest: {type: String},
    currentCity: {type: String},
    verifyed: {type: Boolean,default:false},
    created_on:{type:Date,default : Date.now()},
    forums_id:[{type:mongoose.Schema.Types.ObjectId,ref:'forums'}],
});

// Users.pre('save', async function(next) {
//     try {
//       const forumcredit = new forumcredits(
//         { 
//           user_id: this._id,
//           credits:0,
//           exp_date:null
//         }
//       );
//       await forumcredit.save();
//       const videocounselingcredit = new videocounselingcredits(
//         {
//           user_id: this._id,
//           credits:0,
//           exp_date:null
//         }
//        );
//       await videocounselingcredit.save();
//       next();
//     } catch (err) {
//       next(err);
//     }
// });
Users.pre('remove', async function(next) {
    try {
      await this.model('forums').deleteMany({ user_id: this._id });
      await this.model('forumreplays').deleteMany({ forum_id: this.forums_id });
      await this.model('forumcredits').deleteMany({ user_id: this._id });
      await this.model('videocounselingcredits').deleteMany({ user_id: this._id });
      await this.model('predictioncredits').deleteMany({ user_id: this._id });
      next();
    } catch (err) {
      next(err);
    }
});



module.exports = mongoose.model("users", Users);