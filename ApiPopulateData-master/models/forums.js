var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Forums = new Schema({
    title: {type: String},
    body: {type: String},
    catagory_id: {type: mongoose.Schema.Types.ObjectId,ref:'forumcatagorys'},
    user_id: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    replay_id: [{type:mongoose.Schema.Types.ObjectId,ref:'forumreplays'}],
    created_on:{type:Date,default : Date.now()}
});

Forums.pre('remove', async function(next) {
    try {
      await this.model('forumreplays').deleteMany({ forum_id: this._id });
      await this.model('users').findByIdAndUpdate({_id:this.user_id},{'$pull':{forums_id:this._id}},{ useFindAndModify: false });
      next();
    } catch (err) {
      next(err);
    }
});

module.exports = mongoose.model("forums", Forums);