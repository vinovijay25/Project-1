
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Overview = new Schema({
    college_type: {
        type: String
    },
    university_type: {
        type: String
    },
    email: {
        type: String
    },
    college_name: {
        type: String
    },
    college_code: {
        type: String
    },
    pri_gov:{
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    about: {
        type: String
    },
    year: {
        type: String
    },
    total_branch: {
        type: String
    },
    approved_intake: {
        type: String
    },
    autononous_stus: {
        type: String
    },
    addmission_auth: {
        type: String
    },
    nirf_rank: {
        type: String
    },
    naac_grade: {
        type: String
    },
    image_path: {
        type: String
    },
    address:{
        type: String
    },
    zipcode:{
        type: String
    },
  

    course_id: [{
        type: mongoose.Schema.Types.ObjectId, 
         ref: 'courses'
    }],
    cutoff_id: [{
        type: mongoose.Schema.Types.ObjectId, 
         ref: 'cutoffs'
    }],
    facilites:{
        type: mongoose.Schema.Types.ObjectId, 
         ref: 'facilites'
    },
    placement:{
        type: mongoose.Schema.Types.ObjectId, 
         ref: 'placement'
    },
    created_on:{type:Date,default : Date.now()},
});

Overview.pre('remove', async function(next) {
    try {
      await this.model('courses').deleteMany({ _id: this.course_id });
      await this.model('cutoffs').deleteMany({ _id: this.cutoff_id });
      await this.model('facilites').deleteMany({ overview_id: this._id});
      await this.model('placement').deleteMany({ overview_id: this._id});
      next();
    } catch (err) {
      next(err);
    }
  });

module.exports = mongoose.model("overview", Overview);
