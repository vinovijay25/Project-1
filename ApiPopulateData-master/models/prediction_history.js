var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var prediction_history = new Schema({
    name: {type: String},
    created_at:{type:Date,default : Date.now()},
});

module.exports = mongoose.model("prediction_history", prediction_history);