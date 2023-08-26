
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Course = new Schema({
    overview_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Overview'
       },
    branch_code: {
        type: String
    },
    branch_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Branch'
    },
    branch_approve: {
        type: String
    }, 
    duration: {
        type: String
    },
    branch_year: {
        type: String
    },
    nba_acc: {
        type: String
    },
    acc_valid: {
        type: String
    }, 
    timings: {
        type: String
    },
    total_fees: {
        type: String
    },
    naac_acc: {
        type: String
    },
    nrf_rank: {
        type: String
    },
    valid_upto: {
        type: String
    },
   
     
    created_on:{type:Date,default : Date.now()},
});

Course.pre('remove', async function(next) {
    try {
      await this.model('cutoffs').deleteMany({ course_id: this._id });
      next();
    } catch (err) {
      next(err);
    }
  });

module.exports = mongoose.model("courses", Course);










  