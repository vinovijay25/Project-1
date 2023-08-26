const   express = require('express'),
        port = process.env.PORT || 3001,
        mongoose = require('mongoose'),
        cors = require('cors'),
        router = express();
        const bp = require('body-parser');
        

mongoose.connect("mongodb://127.0.0.1:27017/careeredu", {useUnifiedTopology: true, useNewUrlParser: true});
//import routes
// app.use(bp.json());
mongoose.set('useFindAndModify', false);
const os = require('os');
const path = require('path');

const autoExpaire = require('./utils/autoExpaire');
const overviewRoute = require('./routes/overview.route');
const courseRoute = require('./routes/course.route');
const cutoffRoute = require('./routes/cutoff.route');
const college_typeRoute = require('./routes/college_type.route');
const universityRoute = require('./routes/university.route');
const branchRoute = require('./routes/branch.route');
// const settingRoute = require('./routes/setting.route');
const adminroleRoute = require('./routes/adminrole.route');
const adminuserRoute = require('./routes/adminuser.route');
const adminloginRoute = require('./routes/adminlogin.route');
const userRoute = require('./routes/user.route');
const userloginRoute = require('./routes/userlogin.route');
const forumRoute = require('./routes/forum.route');
const forumreplayRoute = require('./routes/forumreplay.route');
const forumcatagoryRoute = require('./routes/forumcatagory.route');
const videocounsellingRoute = require('./routes/videocounselling.route');
const videocounsellingcatagoryRoute = require('./routes/videocounsellingcatagory.route');
const videocounsellingslotsRoute = require('./routes/videoCounselingSlots.route');
const packageRoute = require('./routes/package.route');
const purchaseRoute = require('./routes/purchase.route');
const facilitiesRoute = require('./routes/facilite.route');
const passwordToken = require('./models/passwordToken');
const placementRoute = require('./routes/placement.route');
const placementstatisticsRoute = require('./routes/placement.statistics.route');
const acadamicStatRoute = require('./routes/acadamic.year.statistics.route');
const reviewRoute = require('./routes/review.route');
const tneaPredictorRoute = require('./routes/tnea-predictor.route');
const rankPredictorRoute = require('./routes/rankPredictor.router');
const youtubevideoRoute = require('./routes/youtubevideo.route');
const uploadCollegeData = require('./routes/upload_college_data.route');
const jwtToken = require('./routes/jwt.route');
const videocounselingStaffallocationRoute = require('./routes/videocounselingStaffallocation.route');
const search_history_route = require('./routes/search_history.route');
const otp = require('./routes/otp.route');
const notificationRoute = require('./routes/notification.router');

router.use(cors());
router.use(bp.json());
router.use(bp.urlencoded({ extended: false }));
router.use('/api', overviewRoute);
router.use('/api', courseRoute);
router.use('/api', cutoffRoute);
router.use('/api', college_typeRoute);
router.use('/api', universityRoute);
router.use('/api', branchRoute);
// router.use('/api', settingRoute);
router.use('/api', adminroleRoute);
router.use('/api', adminuserRoute);
router.use('/api', adminloginRoute);
router.use('/api', userRoute);
router.use('/api', userloginRoute);
router.use('/api', forumRoute);
router.use('/api', forumcatagoryRoute);
router.use('/api', forumreplayRoute);
router.use('/api', videocounsellingRoute);
router.use('/api', videocounsellingcatagoryRoute);
router.use('/api', videocounsellingslotsRoute);
router.use('/api', packageRoute);
router.use('/api', purchaseRoute);
router.use('/api', facilitiesRoute);
router.use('/api', placementRoute);
router.use('/api', placementstatisticsRoute);
router.use('/api', acadamicStatRoute);
router.use('/api', reviewRoute);
router.use('/api', tneaPredictorRoute);
router.use('/api', rankPredictorRoute);
router.use('/api', youtubevideoRoute);
router.use('/api', uploadCollegeData);
router.use('/api', jwtToken);
router.use('/api', videocounselingStaffallocationRoute)
router.use('/api', search_history_route)
router.use('/api', otp)
router.use('/api', notificationRoute)

router.get('/uploads/:filename', function (req, res) {
    const options = {
      root: 'uploads'
    };
  
    const fileName = req.params.filename;
    res.sendFile(fileName, options, function (err) {
      if (err) {
        res.json(err);
        res.status(err.status).end();
      }
      else {
        console.log({message, fileName});
      }
    });
  });
  


//get current hosted ip
const interfaces = os.networkInterfaces();
let ipAddress;

Object.keys(interfaces).forEach((interfaceName) => {
  const interfaceData = interfaces[interfaceName];

  interfaceData.forEach((data) => {
    if (!data.internal && data.family === 'IPv4') {
      ipAddress = data.address;
    }
  });
});

// display all user-defined routes as URLs
const baseUrl = 'http://'+ipAddress+':3001/api'; 
function getRouteUrl(path, prefix) 
{
    const url = prefix.replace(/\/$/, '') + path;
    return baseUrl + url.replace(/^\/\^/, '').replace(/\\\/$/, '');
}

const allRoutes = [];
router._router.stack.forEach((middleware) => {
    if (middleware.route) 
    {
        allRoutes.push(getRouteUrl(middleware.route.path,''));
    } 
    else if (middleware.name === 'router' && middleware.handle.stack) 
    {
        middleware.handle.stack.forEach((handler) => {
        if (handler.route) 
        {
            allRoutes.push(getRouteUrl(handler.route.path,''));
        }
        });
    }
});


router.get('/api',(req,res)=>
{
    res.json(allRoutes);
})

router.get('*', (req, res) => {
    res.send("Error 404 not found!");
});

router.listen(port, ()=> {
    console.log("API Running.");
});
