var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Setting = new Schema({
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3:{
        type: String
    },
    option4: {
        type: String
    },
    option5: {
        type: String
    },

});

module.exports = mongoose.model("Setting", Setting);