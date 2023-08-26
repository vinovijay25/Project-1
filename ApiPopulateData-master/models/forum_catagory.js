var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Forum_Catagory = new Schema({
    name: {type: String},
    created_at:{type:Date,default : Date.now()},
});

module.exports = mongoose.model("forumcatagorys", Forum_Catagory);