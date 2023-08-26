const forumcredits = require("../models/forumcredits");
const videocounselingcredits = require("../models/videocounselingcredits");
const predictioncredits = require('../models/predictioncredits');

async function Expaire()
{
  const now = new Date();
  await forumcredits.updateMany({exp_date:{'$lt':now}},{credits:0,unlimited:null,exp_date:null});
  await videocounselingcredits.updateMany({exp_date:{'$lt':now}},{credits:0,unlimited:null,exp_date:null});
  await predictioncredits.updateMany({exp_date:{'$lt':now}},{credits:0,unlimited:null,exp_date:null});
}

setInterval(Expaire,60 * 1000);