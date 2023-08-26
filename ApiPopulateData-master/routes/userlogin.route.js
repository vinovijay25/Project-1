const express = require('express');
const router = express.Router();
const Users = require('../models/users');
const verifyPassword = require('../utils/verifyPassword');
const generateOtp = require('../utils/otpGenerator');
const sendEmail = require('../utils/sendMail');


//User login username/email & password
router.post('/userlogin',getUser,async(req,res)=>
{
    try 
    {
        const user = res.user;
        if(user)
        {
            const otp = await generateOtp(user.email)
            const html = composemail_otp(otp);
            const subject = 'Login OTP';
            await sendEmail(user.email,subject,html);
        }
        res.status(200).json(user);
    }
    catch (err) 
    {
        res.status(400).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    try
    {

        const _user = await Users.findOne({'$or' :[{phone:req.body.phone_or_email},{email:req.body.phone_or_email}]});
        if(!_user.verifyed)
        {
            return res.status(201).json({ message: 'account not verifyed.' });
        }
        //send otp
        try {
            const user = await Users.aggregate([
                {
                    $match:
                    {
                        _id:_user._id,
                    }
                },
                {
                    $project:
                    {
                        _id:1,
                        name:1,
                        email:1,
                        phone:1,
                    }
                }
            ]);
            if (user.length <= 0) {
                return res.status(201).json({ message: 'Cannot find user' });
            }
            res.user = user[0];
            
            next();
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
    catch(err)
    {
        return res.status(201).json({ message: 'Cannot find user' });
    }
}

function composemail_otp(otp)
{
    const html = `<!DOCTYPE html>
    <!-- saved from url=(0063)file:///C:/Users/Admin/Downloads/I_love_Enginemailer%20(2).html -->
    <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title></title><meta name="viewport" content="width=device-width,initial-scale=1"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><style>
    *{box-sizing:border-box}body{margin:0;padding:0}a[x-apple-data-detectors]{color:inherit!important;text-decoration:inherit!important}#MessageViewBody a{color:inherit;text-decoration:none}p{line-height:inherit}.desktop_hide,.desktop_hide table{mso-hide:all;display:none;max-height:0;overflow:hidden}.image_block img+div{display:none} @media (max-width:520px){.row-content{width:100%!important}.mobile_hide{display:none}.stack .column{width:100%;display:block}.mobile_hide{min-height:0;max-height:0;max-width:0;overflow:hidden;font-size:0}.desktop_hide,.desktop_hide table{display:table!important;max-height:none!important}}
    </style></head><body style="background-color:#fff;margin:0;padding:0;-webkit-text-size-adjust:none;text-size-adjust:none"><table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#fff"><tbody><tr><td><table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;background-color:#bd1721">
    <tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;color:#000;width:500px" width="500"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><div class="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px"> </div><table class="text_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tbody><tr><td class="pad"><div style="font-family:sans-serif"><div class="" style="font-size:14px;font-family:Arial,&#39;Helvetica Neue&#39;,Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#fff;line-height:1.2"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:50px;"><strong>Career Educators</strong></span></p></div></div></td></tr></tbody></table><div class="spacer_block block-3" style="height:60px;line-height:60px;font-size:1px"> </div></td></tr></tbody></table></td></tr></tbody></table><table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody>
    <tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:500px" width="500"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tbody><tr><td class="pad"><div style="font-family:sans-serif"><div class="" style="font-size:14px;font-family:Arial,&#39;Helvetica Neue&#39;,Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">
    <strong><span style="font-size:16px;">Here is your One Time Password </span></strong></p><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px">to validate your email address</p></div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><table class="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:500px" width="500"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tbody><tr><td class="pad"><div style="font-family:sans-serif"><div class="" style="font-size:14px;font-family:Arial,&#39;Helvetica Neue&#39;,Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p dir="ltr" style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:50px;"><strong>${otp}</strong></span></p></div></div></td></tr></tbody></table></td></tr>
    </tbody></table></td></tr></tbody></table><table class="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0"><tbody><tr><td><table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;border-radius:0;color:#000;width:500px" width="500"><tbody><tr><td class="column column-1" width="100%" style="mso-table-lspace:0;mso-table-rspace:0;font-weight:400;text-align:left;padding-bottom:5px;padding-top:5px;vertical-align:top;border-top:0;border-right:0;border-bottom:0;border-left:0"><table class="text_block block-1" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace:0;mso-table-rspace:0;word-break:break-word"><tbody><tr><td class="pad"><div style="font-family:sans-serif"><div class="" style="font-size:14px;font-family:Arial,&#39;Helvetica Neue&#39;,Helvetica,sans-serif;mso-line-height-alt:16.8px;color:#555;line-height:1.2"><p style="margin:0;font-size:14px;text-align:center;mso-line-height-alt:16.8px"><span style="font-size:15px;color:#bd1721;">Valid for 10minutes only</span></p></div></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table><!-- End --><div style="background-color:transparent;">
        <div style="Margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;" class="block-grid ">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background-color:transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width: 500px;"><tr class="layout-full-width" style="background-color:transparent;"><![endif]-->
                <!--[if (mso)|(IE)]><td align="center" width="500" style=" width:500px; padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:15px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><![endif]-->
                <div class="col num12" style="min-width: 320px;max-width: 500px;display: table-cell;vertical-align: top;">
                    <div style="background-color: transparent; width: 100% !important;">
                        <!--[if (!mso)&(!IE)]><!--><div style="border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent; padding-top:15px; padding-bottom:15px; padding-right: 0px; padding-left: 0px;">
                            <!--<![endif]-->
    
    
                            <div align="center" class="img-container center  autowidth " style="padding-right: 0px;  padding-left: 0px;">
                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px;" align="center"><![endif]-->
    
                                
                                <!--[if mso]></td></tr></table><![endif]-->
                            </div>
    
    
                            <!--[if (!mso)&(!IE)]><!-->
                        </div><!--<![endif]-->
                    </div>
                </div>
                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div></body></html>`;

    return html;
}

module.exports = router;