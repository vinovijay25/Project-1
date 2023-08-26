var mongoose = require('mongoose');
var otpgenerator = require('../utils/otpGenerator');
var Schema = mongoose.Schema;

var PasswordToken = new Schema({
    token: {type: String,default:otpgenerator()},
    user_id: {type: mongoose.Schema.Types.ObjectId,ref:'users'},
    expair:{type:Date}
});


module.exports = mongoose.model("passwordtoken", PasswordToken);