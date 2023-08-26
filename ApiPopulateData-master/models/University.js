var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var University = new Schema({
    college_type: {
        type: String
    },
    university: {
        type: String
    },

});

module.exports = mongoose.model("University", University);