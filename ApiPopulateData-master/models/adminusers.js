var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Adminusers = new Schema({
    username: {type: String},
    email: {type: String},
    phone: {type: String},
    password: {type: String},
    role: {type: mongoose.Schema.Types.ObjectId,ref:'adminroles'},
    created_on:{type:Date,default : Date.now()}
});

Adminusers.pre('remove', async function(next) {
    try {
      await this.model('forumreplays').deleteMany({ adminuser_id: this._id });
      next();
    } catch (err) {
      next(err);
    }
});

module.exports = mongoose.model("adminusers", Adminusers);