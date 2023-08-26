var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Facilites = new Schema({
    overview_id: {type:mongoose.Schema.Types.ObjectId,ref:'overview'},
    about: {type:String},
    boys_hostel: {type:String},
    girls_hostel: {type:String},
    hospital: {type:String},
    gym: {type:String},
    library: {type:String},
    sports: {type:String},
    it_infrastructure: {type:String},
    cafitariya: {type:String},
    auditorium: {type:String},
    transport: {type:String},
    alumni_assocication: {type:String},
    wifi: {type:String},
    laboratories: {type:String},
    guest_room: {type:String},
    created_at:{type:Date,default : Date.now()},
});

module.exports = mongoose.model("facilites", Facilites);