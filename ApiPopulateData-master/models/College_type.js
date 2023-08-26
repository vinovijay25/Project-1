var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var College_type = new Schema({
    college_type_name: {
        type: String
    },

});

module.exports = mongoose.model("College_type", College_type);
