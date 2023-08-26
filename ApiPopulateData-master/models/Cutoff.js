
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Cutoff = new Schema({

    overview_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'overview'
       },
    course_id: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'courses'
    },
    cutof_cutoff: {
        type: String
    },
    cutof_rank: {
        type: String
    },
    cutof_year: {
        type: String
    },
    caste: {
        type: String
    },
    bc: {
        type: Number
    },  
    mbc: {
        type: Number
    },  
    bcm: {
        type: Number
    },  
    oc: {
        type: Number
    },  
    sc: {
        type: Number
    },  
    sca: {
        type: Number
    },  
    st: {
        type: Number
    },  
    bc_rank: {
        type: Number
    },  
    mbc_rank: {
        type: Number
    },  
    bcm_rank: {
        type: Number
    },  
    oc_rank: {
        type: Number
    },  
    sc_rank: {
        type: Number
    },  
    sca_rank: {
        type: Number
    },  
    st_rank: {
        type: Number
    },  
   
    created_on:{type:Date,default : Date.now()},
});

module.exports = mongoose.model("cutoffs", Cutoff);















// module.exports = mongoose => {
//     var schema = mongoose.Schema(
//       {
//         companyName: String,
//         jobTitle: String,
//         joinDate:String
//       },
//       { timestamps: true }
//     );
  
//     schema.method("toJSON", function() {
//       const { __v, _id, ...object } = this.toObject();
//       object.id = _id;
//       return object;
//     });
  
//     const Employee = mongoose.model("Employee", Employee);
//     return Employee;
//   };
  