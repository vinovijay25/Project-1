const userOtp = require('../models/otp.js');

async function generateOtp(mobile_or_email)
{
    if(mobile_or_email)
    {
        const _userOtp = await userOtp.findOne({mobile_or_email:mobile_or_email});
        const respons = mobile_or_email.includes('@')?'email':'mobile';
        if(_userOtp != null)
        {
            const otp = await GenerateOTP();
            _userOtp.otp = otp;
            _userOtp.expiresAt = Date.now() + 600000;
            const newUserOtp = await _userOtp.save();
            return await otp;
        }
        else
        {
            const otp = await GenerateOTP();
            const _userOtp = new userOtp({
                otp:otp,
                mobile_or_email:mobile_or_email,
                expiresAt: Date.now() + 600000
            });
            const newUserOtp = await _userOtp.save();
            return await otp;
        }
    }
    else
    {
        return await {message:"mobile_or_email is empty"};
    }
}

async function GenerateOTP() 
{
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    this.otp = otp;
    return otp;
};

module.exports = generateOtp;