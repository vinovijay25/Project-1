var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ForumsReplays = new Schema({
    forum_id: {type: mongoose.Schema.Types.ObjectId,ref:'forums'},
    body: {type: String},
    adminuser_id: {type: mongoose.Schema.Types.ObjectId,ref:'adminusers'},
    created_on:{type:Date,default : Date.now()}
});

module.exports = mongoose.model("forumreplays", ForumsReplays);