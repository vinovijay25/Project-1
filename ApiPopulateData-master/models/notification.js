var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Notifications = new Schema({
    title: {type: String},
    description: {type: String},
    url: {type: String},

});
module.exports = mongoose.model("notifications", Notifications);