var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Videocounsellingcatagory = new Schema({
    name: {type: String},
    created_at:{type:Date,default : Date.now()},
});

module.exports = mongoose.model("videocounsellingcatagory", Videocounsellingcatagory);