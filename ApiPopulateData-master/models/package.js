var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Packages = new Schema({
    name: {type: String},
    discription: {type: String},
    price: {type: mongoose.Schema.Types.Number,float:true},
    credits: [{type: Number}],
    unlimited: [{type: Boolean}],
    type: {type: String},
    packages: [{type: String}],
    validity:{type:Number},
    status: {type: String,default:'active'},
    created_at:{type:Date,default : Date.now()},
});

module.exports = mongoose.model("packages", Packages);