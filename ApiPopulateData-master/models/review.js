var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema({
    overview_id: {type: mongoose.Schema.Types.ObjectId,ref:'overview'},
    course_id: {type: mongoose.Schema.Types.ObjectId,ref:'courses'},
    posted_by: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    batch:{type:String},
    created_on:{type:Date,default : Date.now()},
    college_infrastructure: {type:String},
    college_infrastructure_ratings: {type:Number},
    academics: {type:String},
    academics_ratings: {type:Number},
    placements: {type:String},
    placements_ratings: {type:Number},
    value_for_money: {type:String},
    value_for_money_ratings: {type:Number},
    campus_life: {type:String},
    campus_life_ratings: {type:Number},
    overall: {type:String},
    overall_ratings: {type:Number},
    isAnonymous:{type:Boolean,default:false},
    isVerifyed:{type:Boolean,default:false},
});

module.exports = mongoose.model("reviews", Review);