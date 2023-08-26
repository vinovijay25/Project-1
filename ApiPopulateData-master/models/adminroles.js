var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Adminroles = new Schema({
    name: {type: String},
    modules: {type: [String]},
    privilages: {type: [String]},
});

module.exports = mongoose.model("adminroles", Adminroles);