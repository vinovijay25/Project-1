var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var predictioncredits = new Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    unlimited: {type: Boolean,default:false},
    credits: {type: Number},
    exp_date:{type:Date},
});

module.exports = mongoose.model("predictioncredits", predictioncredits);