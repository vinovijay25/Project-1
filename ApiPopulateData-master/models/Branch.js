var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Branch = new Schema({
    university_type: {
        type: String
    },
    branch: {
        type: String
    },
    branchcode:{
        type: String
    },
    degree: {
        type: String
    },
    level: {
        type: String
    },

});

module.exports = mongoose.model("Branch", Branch);