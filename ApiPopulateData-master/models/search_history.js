var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var search_history = new Schema({
    college_code: {type: String},
    count: {type: Number,default:1},
    created_at:{type: { month: Number, year: Number },default: () => {const now = new Date();return { month: now.getMonth() + 1, year: now.getFullYear() };}}
});

module.exports = mongoose.model("search_history", search_history);