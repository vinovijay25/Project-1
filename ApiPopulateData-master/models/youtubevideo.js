
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Youtubevideo = new Schema({
    category: {
        type: String
    },
    subcategory: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    link: {
        type: String
    },

    created_at:{
        type:Date,default : Date.now()
    },

    
});


module.exports = mongoose.model("youtubevideo", Youtubevideo);
