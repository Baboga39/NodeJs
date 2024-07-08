const nodemailer = require('nodemailer');


// const generateEmail = (code) => {
//     return `<!DOCTYPE html>
//   <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
  
//   <head>
//       <title></title>
//       <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
//       <style>
//           * {
//               box-sizing: border-box;
//           }
  
//           body {
//               margin: 0;
//               padding: 0;
//           }
  
//           a[x-apple-data-detectors] {
//               color: inherit !important;
//               text-decoration: inherit !important;
//           }
  
//           #MessageViewBody a {
//               color: inherit;
//               text-decoration: none;
//           }
  
//           p {
//               line-height: inherit
//           }
  
//           .desktop_hide,
//           .desktop_hide table {
//               mso-hide: all;
//               display: none;
//               max-height: 0px;
//               overflow: hidden;
//           }
  
//           .image_block img+div {
//               display: none;
//           }
  
//           @media (max-width:520px) {
//               .desktop_hide table.icons-inner {
//                   display: inline-block !important;
//               }
  
//               .icons-inner {
//                   text-align: center;
//               }
  
//               .icons-inner td {
//                   margin: 0 auto;
//               }
  
//               .row-content {
//                   width: 100% !important;
//               }
  
//               .mobile_hide {
//                   display: none;
//               }
  
//               .stack .column {
//                   width: 100%;
//                   display: block;
//               }
  
//               .mobile_hide {
//                   min-height: 0;
//                   max-height: 0;
//                   max-width: 0;
//                   overflow: hidden;
//                   font-size: 0px;
//               }
  
//               .desktop_hide,
//               .desktop_hide table {
//                   display: table !important;
//                   max-height: none !important;
//               }
//           }
//       </style>
//   </head>
  
//   <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//       <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
//           <tbody>
//               <tr>
//                   <td>
//                       <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                           <tbody>
//                               <tr>
//                                   <td>
//                                       <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
//                                           <tbody>
//                                               <tr>
//                                                   <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                       <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                           <tr>
//                                                               <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
//                                                                   <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                   </td>
//                                               </tr>
//                                           </tbody>
//                                       </table>
//                                   </td>
//                               </tr>
//                           </tbody>
//                       </table>
//                       <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                           <tbody>
//                               <tr>
//                                   <td>
//                                       <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-   rspace: 0pt; color: #000000; width: 500px;" width="500">
//                                           <tbody>
//                                               <tr>
//                                                   <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                                                       <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                           <tr>
//                                                               <td class="pad" style="text-align:center;width:100%;">
//                                                                   <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Xác minh tài khoản của bạn</span></h1>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                       <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                           <tr>
//                                                               <td class="pad">
//                                                                   <div class="alignment" align="center">
//                                                                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                                           <tr>
//                                                                               <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                                                           </tr>
//                                                                       </table>
//                                                                   </div>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                       <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                                           <tr>
//                                                               <td class="pad">
//                                                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
//                                                                       <p style="margin: 0;">Cảm ơn bạn đã đăng ký tài khoản với hệ thống chúng tôi. Chúng tôi muốn đảm bảo rằng đó thực sự là bạn. Vui lòng dùng mã xác nhận để nhập khi được yêu cầu. Lưu ý đây là mã bảo mật vui lòng không chia sẻ với ai. Cảm ơn bạn</p>
//                                                                   </div>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                       <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                           <tr>
//                                                               <td class="pad">
//                                                                   <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Mã xác thực</span></h3>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                       <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                           <tr>
//                                                               <td class="pad">
//                                                                   <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${code}</span></h2>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                       <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                           <tr>
//                                                               <td class="pad" style="text-align:center;width:100%;">
//                                                                   <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">(Có hiệu lực 10 phút)</span></h3>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                       <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                           <tr>
//                                                               <td class="pad">
//                                                                   <div class="alignment" align="center">
//                                                                       <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                                                           <tr>
//                                                                               <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                                                           </tr>
//                                                                       </table>
//                                                                   </div>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                       <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                                                           <tr>
//                                                               <td class="pad">
//                                                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
//                                                                       <p style="margin: 0;"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u> vui lòng không reply<br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,<em> Vietnam.<br></em></p>
//                                                                   </div>
//                                                               </td>
//                                                           </tr>
//                                                       </table>
//                                                   </td>
//                                               </tr>
//                                           </tbody>
//                                       </table>
//                                   </td>
//                               </tr>
//                           </tbody>
//                       </table><!-- End -->
//                   </td>
//               </tr>
//           </tbody>
//       </table>
//   </body>
  
//   </html>`;
//   };  
const generateEmail = (code) => {
  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        @media (max-width:520px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .row-content {
                width: 100% !important;
            }

            .mobile_hide {
                display: none;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
        <tbody>
            <tr>
                <td>
                    <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                                                <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-   rspace: 0pt; color: #000000; width: 500px;" width="500">
                                        <tbody>
                                            <tr>
                                                <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="text-align:center;width:100%;">
                                                                <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Verify your account</span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;">
                                                                    <p style="margin: 0;">Thank you for registering an account with our system. We want to ensure that it is really you. Please use the confirmation code provided when prompted. Note that this is a security code, please do not share it with anyone. Thank you.</p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Verification Code</span></h3>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${code}</span></h2>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad" style="text-align:center;width:100%;">
                                                                <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 12px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">(Valid for 10 minutes)</span></h3>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div class="alignment" align="center">
                                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                        <tr>
                                                                            <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                                                        </tr>
                                                                    </table>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td class="pad">
                                                                <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                                                    <p style="margin: 0;"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u>, please do not reply<br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,<em> Vietnam.<br></em></p>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table><!-- End -->
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>`;
};

// const deleteBlog = (title) => {
//     return `<!DOCTYPE html>
// <html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

// <head>
//   <title></title>
//   <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
//   <style>
//     * {
//       box-sizing: border-box;
//     }

//     body {
//       margin: 0;
//       padding: 0;
//     }

//     a[x-apple-data-detectors] {
//       color: inherit !important;
//       text-decoration: inherit !important;
//     }

//     #MessageViewBody a {
//       color: inherit;
//       text-decoration: none;
//     }

//     p {
//       line-height: inherit
//     }

//     .desktop_hide,
//     .desktop_hide table {
//       mso-hide: all;
//       display: none;
//       max-height: 0px;
//       overflow: hidden;
//     }

//     .image_block img+div {
//       display: none;
//     }

//     @media (max-width:520px) {
//       .desktop_hide table.icons-inner {
//         display: inline-block !important;
//       }

//       .icons-inner {
//         text-align: center;
//       }

//       .icons-inner td {
//         margin: 0 auto;
//       }

//       .row-content {
//         width: 100% !important;
//       }

//       .mobile_hide {
//         display: none;
//       }

//       .stack .column {
//         width: 100%;
//         display: block;
//       }

//       .mobile_hide {
//         min-height: 0;
//         max-height: 0;
//         max-width: 0;
//         overflow: hidden;
//         font-size: 0px;
//       }

//       .desktop_hide,
//       .desktop_hide table {
//         display: table !important;
//         max-height: none !important;
//       }
//     }
//   </style>
// </head>

// <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//   <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
//     <tbody>
//       <tr>
//         <td>
//           <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//             <tbody>
//               <tr>
//                 <td>
//                   <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
//                     <tbody>
//                       <tr>
//                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                           <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             <tr>
//                               <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
//                                 <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
//                               </td>
//                             </tr>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//             <tbody>
//               <tr>
//                 <td>
//                   <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
//                     <tbody>
//                       <tr>
//                         <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                           <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             <tr>
//                               <td class="pad" style="text-align:center;width:100%;">
//                                 <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Xóa bài viết</span></h1>
//                               </td>
//                             </tr>
//                           </table>
//                           <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             <tr>
//                               <td class="pad">
//                                 <div class="alignment" align="center">
//                                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                     <tr>
//                                       <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                     </tr>
//                                   </table>
//                                 </div>
//                               </td>
//                             </tr>
//                           </table>
//                           <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                             <tr>
//                               <td class="pad">  
//                                 <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                     <p>Chúng tôi muốn thông báo rằng bài viết của bạn trên hệ thống của chúng tôi đã được phát hiện vi phạm vào quy tắc chung mà chúng tôi thiết lập. Bài viết đã được loại bỏ và chúng tôi đưa ra thông báo này để bạn nhận biết về tình trạng này.</p>
//                                     <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                         <tr>
//                                           <td class="pad">
//                                             <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Tiêu đề bài viết</span></h3>
//                                           </td>
//                                         </tr>
//                                         <tr>
//                                           <td class="pad">
//                                             <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${title}</span></h3>
//                                           </td>
//                                         </tr>
//                                       </table>
//                                     <p>Chúng tôi muốn nhắc nhở bạn rằng việc tuân thủ quy tắc và điều khoản sử dụng là rất quan trọng để duy trì một môi trường sạch sẽ và tích cực cho cộng đồng.</p>
//                                 </div>           
//                               </td>
//                             </tr>
//                           </table>
//                           <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             <tr>
//                               <td class="pad">
//                                 <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder"></span></h2>
//                               </td>
//                             </tr>
//                           </table>
//                           <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                           </table>
//                           <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             <tr>
//                               <td class="pad">
//                                 <div class="alignment" align="center">
//                                   <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                     <tr>
//                                       <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                     </tr>
//                                   </table>
//                                 </div>
//                               </td>
//                             </tr>
//                           </table>
//                           <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                             <tr>
//                               <td class="pad">
//                                 <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
//                                   <p style="margin: 0;"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,
//                                     Vietnam.<br></em></p>
//                                 </div>
//                               </td>
//                             </tr>
//                           </table>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </td>
//               </tr>
//             </tbody>
//           </table><!-- End -->
//         </td>
//       </tr>
//     </tbody>
//   </table>
// </body>

// </html>`;
// }
const deleteBlog = (title) => {
  return `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->
<style>
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: inherit !important;
  }

  #MessageViewBody a {
    color: inherit;
    text-decoration: none;
  }

  p {
    line-height: inherit
  }

  .desktop_hide,
  .desktop_hide table {
    mso-hide: all;
    display: none;
    max-height: 0px;
    overflow: hidden;
  }

  .image_block img+div {
    display: none;
  }

  @media (max-width:520px) {
    .desktop_hide table.icons-inner {
      display: inline-block !important;
    }

    .icons-inner {
      text-align: center;
    }

    .icons-inner td {
      margin: 0 auto;
    }

    .row-content {
      width: 100% !important;
    }

    .mobile_hide {
      display: none;
    }

    .stack .column {
      width: 100%;
      display: block;
    }

    .mobile_hide {
      min-height: 0;
      max-height: 0;
      max-width: 0;
      overflow: hidden;
      font-size: 0px;
    }

    .desktop_hide,
    .desktop_hide table {
      display: table !important;
      max-height: none !important;
    }
  }
</style>
</head>

<body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
  <tbody>
    <tr>
      <td>
        <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <tbody>
            <tr>
              <td>
                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                  <tbody>
                    <tr>
                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                        <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                              <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
        <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <tbody>
            <tr>
              <td>
                <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                  <tbody>
                    <tr>
                      <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                        <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td class="pad" style="text-align:center;width:100%;">
                              <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Delete Post</span></h1>
                            </td>
                          </tr>
                        </table>
                        <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td class="pad">
                              <div class="alignment" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table>
                        <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                          <tr>
                            <td class="pad">  
                              <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                  <p>We would like to inform you that your post on our system has been found to violate the general rules we have established. The post has been removed and we are issuing this notification to make you aware of the situation.</p>
                                  <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="pad">
                                          <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">Post Title</span></h3>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td class="pad">
                                          <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder">${title}</span></h3>
                                        </td>
                                      </tr>
                                    </table>
                                  <p>We would like to remind you that adhering to the rules and terms of use is very important to maintain a clean and positive environment for the community.</p>
                              </div>           
                            </td>
                          </tr>
                        </table>
                        <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td class="pad">
                              <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span class="tinyMce-placeholder"></span></h2>
                            </td>
                          </tr>
                        </table>
                        <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        </table>
                        <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                          <tr>
                            <td class="pad">
                              <div class="alignment" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                  <tr>
                                    <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                  </tr>
                                </table>
                              </div>
                            </td>
                          </tr>
                        </table>
                        <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                          <tr>
                            <td class="pad">
                              <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                <p style="margin: 0;"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,
                                  Vietnam.<br></em></p>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table><!-- End -->
      </td>
    </tr>
  </tbody>
</table>
</body>

</html>`;
}

// const warningUser= (reason) => {
//   return "<!DOCTYPE html>\n" +
//   "<html xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" lang=\"en\">\n" +
//   "\n" +
//   "<head>\n" +
//   "  <title></title>\n" +
//   "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
//   "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
//   "  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->\n" +
//   "  <style>\n" +
//   "    * {\n" +
//   "      box-sizing: border-box;\n" +
//   "    }\n" +
//   "\n" +
//   "    body {\n" +
//   "      margin: 0;\n" +
//   "      padding: 0; \n" +
//   "    }\n" +
//   "\n" +
//   "    a[x-apple-data-detectors] {\n" +
//   "      color: inherit !important;\n" +
//   "      text-decoration: inherit !important;\n" +
//   "    }\n" +
//   "\n" +
//   "    #MessageViewBody a {\n" +
//   "      color: inherit;\n" +
//   "      text-decoration: none;\n" +
//   "    }\n" +
//   "\n" +
//   "    p {\n" +
//   "      line-height: inherit\n" +
//   "    }\n" +
//   "\n" +
//   "    .desktop_hide,\n" +
//   "    .desktop_hide table {\n" +
//   "      mso-hide: all;\n" +
//   "      display: none;\n" +
//   "      max-height: 0px;\n" +
//   "      overflow: hidden;\n" +
//   "    }\n" +
//   "\n" +
//   "    .image_block img+div {\n" +
//   "      display: none;\n" +
//   "    }\n" +
//   "\n" +
//   "    @media (max-width:520px) {\n" +
//   "      .desktop_hide table.icons-inner {\n" +
//   "        display: inline-block !important;\n" +
//   "      }\n" +
//   "\n" +
//   "      .icons-inner {\n" +
//   "        text-align: center;\n" +
//   "      }\n" +
//   "\n" +
//   "      .icons-inner td {\n" +
//   "        margin: 0 auto;\n" +
//   "      }\n" +
//   "\n" +
//   "      .row-content {\n" +
//   "        width: 100% !important;\n" +
//   "      }\n" +
//   "\n" +
//   "      .mobile_hide {\n" +
//   "        display: none;\n" +
//   "      }\n" +
//   "\n" +
//   "      .stack .column {\n" +
//   "        width: 100%;\n" +
//   "        display: block;\n" +
//   "      }\n" +
//   "\n" +
//   "      .mobile_hide {\n" +
//   "        min-height: 0;\n" +
//   "        max-height: 0;\n" +
//   "        max-width: 0;\n" +
//   "        overflow: hidden;\n" +
//   "        font-size: 0px;\n" +
//   "      }\n" +
//   "\n" +
//   "      .desktop_hide,\n" +
//   "      .desktop_hide table {\n" +
//   "        display: table !important;\n" +
//   "        max-height: none !important;\n" +
//   "      }\n" +
//   "    }\n" +
//   "  </style>\n" +
//   "</head>\n" +
//   "\n" +
//   "<body style=\"background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;\">\n" +
//   "  <table class=\"nl-container\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;\">\n" +
//   "    <tbody>\n" +
//   "      <tr>\n" +
//   "        <td>\n" +
//   "          <table class=\"row row-1\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "            <tbody>\n" +
//   "              <tr>\n" +
//   "                <td>\n" +
//   "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;\" width=\"500\">\n" +
//   "                    <tbody>\n" +
//   "                      <tr>\n" +
//   "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
//   "                          <table class=\"image_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\" style=\"width:100%;padding-right:0px;padding-left:0px;\">\n" +
//   "                                <div class=\"alignment\" align=\"center\" style=\"line-height:10px\"><img src=\"https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png\" style=\"display: block; height: auto; border: 0; width: 100px; max-width: 100%;\" width=\"100\"></div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                        </td>\n" +
//   "                      </tr>\n" +
//   "                    </tbody>\n" +
//   "                  </table>\n" +
//   "                </td>\n" +
//   "              </tr>\n" +
//   "            </tbody>\n" +
//   "          </table>\n" +
//   "          <table class=\"row row-2\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "            <tbody>\n" +
//   "              <tr>\n" +
//   "                <td>\n" +
//   "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;\" width=\"500\">\n" +
//   "                    <tbody>\n" +
//   "                      <tr>\n" +
//   "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
//   "                          <table class=\"heading_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\" style=\"text-align:center;width:100%;\">\n" +
//   "                                <h1 style=\"margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">Cảnh báo vi phạm</span></h1>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"divider_block block-2\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div class=\"alignment\" align=\"center\">\n" +
//   "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                                    <tr>\n" +
//   "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
//   "                                    </tr>\n" +
//   "                                  </table>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"paragraph_block block-3\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;\">\n" +
//   "                        <p>\n" +
//   "    Chúng tôi nhận thấy rằng tài khoản liên kết với địa chỉ email này đã có hành vi vi phạm quy định của hệ thống chúng tôi. Đây là cảnh báo chính thức và đề xuất bạn kiểm tra hoạt động của mình.\n" +
//   "</p>\n" +
//   "<p>\n" +
//   "    Lưu ý rằng việc vi phạm tiếp theo có thể dẫn đến tình trạng khóa tài khoản của bạn. Đề nghị bạn tuân thủ chặt chẽ các quy tắc và điều khoản sử dụng để tránh tình trạng này.\n" +
//   "</p>\n" +
//   "<p>\n" +
//   "    Trân trọng\n" +
//   "</p>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"heading_block block-4\" width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <h3 style=\"margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">Lí do</span></h3>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <h3 style=\"margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">" + reason +"</span></h3>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"heading_block block-5\" width=\"100%\" border=\"0\" cellpadding=\"15\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <h2 style=\"margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\"></span></h2>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"heading_block block-6\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                          </table>\n" +
//   "                          <table class=\"divider_block block-7\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div class=\"alignment\" align=\"center\">\n" +
//   "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                                    <tr>\n" +
//   "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
//   "                                    </tr>\n" +
//   "                                  </table>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"paragraph_block block-8\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;\">\n" +
//   "                                  <p style=\"margin: 0;\"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node=\"[object Object]\" prompt=\"Tell me more about Thu Duc City.\" style=\"text-decoration: underline; color: #0068a5;\">Thu Duc City</a>, <a node=\"[object Object]\" prompt=\"Tell me more about Ho Chi Minh City.\" style=\"text-decoration: underline; color: #0068a5;\">Ho Chi Minh City</a>,<em> Vietnam.<br></em></p>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                        </td>\n" +
//   "                      </tr>\n" +
//   "                    </tbody>\n" +
//   "                  </table>\n" +
//   "                </td>\n" +
//   "              </tr>\n" +
//   "            </tbody>\n" +
//   "          </table><!-- End -->\n" +
//   "        </td>\n" +
//   "      </tr>\n" +
//   "    </tbody>\n" +
//   "  </table>\n" +
//   "</body>\n" +
//   "\n" +
//   "</html>";
// }
//English 
const warningUser = (reason) => {
  return "<!DOCTYPE html>\n" +
  "<html xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" lang=\"en\">\n" +
  "\n" +
  "<head>\n" +
  "  <title></title>\n" +
  "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
  "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
  "  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->\n" +
  "  <style>\n" +
  "    * {\n" +
  "      box-sizing: border-box;\n" +
  "    }\n" +
  "\n" +
  "    body {\n" +
  "      margin: 0;\n" +
  "      padding: 0; \n" +
  "    }\n" +
  "\n" +
  "    a[x-apple-data-detectors] {\n" +
  "      color: inherit !important;\n" +
  "      text-decoration: inherit !important;\n" +
  "    }\n" +
  "\n" +
  "    #MessageViewBody a {\n" +
  "      color: inherit;\n" +
  "      text-decoration: none;\n" +
  "    }\n" +
  "\n" +
  "    p {\n" +
  "      line-height: inherit\n" +
  "    }\n" +
  "\n" +
  "    .desktop_hide,\n" +
  "    .desktop_hide table {\n" +
  "      mso-hide: all;\n" +
  "      display: none;\n" +
  "      max-height: 0px;\n" +
  "      overflow: hidden;\n" +
  "    }\n" +
  "\n" +
  "    .image_block img+div {\n" +
  "      display: none;\n" +
  "    }\n" +
  "\n" +
  "    @media (max-width:520px) {\n" +
  "      .desktop_hide table.icons-inner {\n" +
  "        display: inline-block !important;\n" +
  "      }\n" +
  "\n" +
  "      .icons-inner {\n" +
  "        text-align: center;\n" +
  "      }\n" +
  "\n" +
  "      .icons-inner td {\n" +
  "        margin: 0 auto;\n" +
  "      }\n" +
  "\n" +
  "      .row-content {\n" +
  "        width: 100% !important;\n" +
  "      }\n" +
  "\n" +
  "      .mobile_hide {\n" +
  "        display: none;\n" +
  "      }\n" +
  "\n" +
  "      .stack .column {\n" +
  "        width: 100%;\n" +
  "        display: block;\n" +
  "      }\n" +
  "\n" +
  "      .mobile_hide {\n" +
  "        min-height: 0;\n" +
  "        max-height: 0;\n" +
  "        max-width: 0;\n" +
  "        overflow: hidden;\n" +
  "        font-size: 0px;\n" +
  "      }\n" +
  "\n" +
  "      .desktop_hide,\n" +
  "      .desktop_hide table {\n" +
  "        display: table !important;\n" +
  "        max-height: none !important;\n" +
  "      }\n" +
  "    }\n" +
  "  </style>\n" +
  "</head>\n" +
  "\n" +
  "<body style=\"background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;\">\n" +
  "  <table class=\"nl-container\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;\">\n" +
  "    <tbody>\n" +
  "      <tr>\n" +
  "        <td>\n" +
  "          <table class=\"row row-1\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "            <tbody>\n" +
  "              <tr>\n" +
  "                <td>\n" +
  "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;\" width=\"500\">\n" +
  "                    <tbody>\n" +
  "                      <tr>\n" +
  "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
  "                          <table class=\"image_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\" style=\"width:100%;padding-right:0px;padding-left:0px;\">\n" +
  "                                <div class=\"alignment\" align=\"center\" style=\"line-height:10px\"><img src=\"https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png\" style=\"display: block; height: auto; border: 0; width: 100px; max-width: 100%;\" width=\"100\"></div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                        </td>\n" +
  "                      </tr>\n" +
  "                    </tbody>\n" +
  "                  </table>\n" +
  "                </td>\n" +
  "              </tr>\n" +
  "            </tbody>\n" +
  "          </table>\n" +
  "          <table class=\"row row-2\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "            <tbody>\n" +
  "              <tr>\n" +
  "                <td>\n" +
  "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;\" width=\"500\">\n" +
  "                    <tbody>\n" +
  "                      <tr>\n" +
  "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
  "                          <table class=\"heading_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\" style=\"text-align:center;width:100%;\">\n" +
  "                                <h1 style=\"margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">Violation Warning</span></h1>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"divider_block block-2\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div class=\"alignment\" align=\"center\">\n" +
  "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                                    <tr>\n" +
  "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
  "                                    </tr>\n" +
  "                                  </table>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"paragraph_block block-3\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:left;mso-line-height-alt:16.8px;\">\n" +
  "                        <p>\n" +
  "    We have noticed that the account associated with this email address has violated our system's regulations. This is an official warning and we suggest you review your activities.\n" +
  "</p>\n" +
  "<p>\n" +
  "    Please note that further violations may result in your account being locked. We urge you to strictly adhere to the rules and terms of use to avoid this situation.\n" +
  "</p>\n" +
  "<p>\n" +
  "    Best regards,\n" +
  "</p>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"heading_block block-4\" width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <h3 style=\"margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">Reason</span></h3>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <h3 style=\"margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">" + reason +"</span></h3>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"heading_block block-5\" width=\"100%\" border=\"0\" cellpadding=\"15\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <h2 style=\"margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\"></span></h2>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"heading_block block-6\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                          </table>\n" +
  "                          <table class=\"divider_block block-7\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div class=\"alignment\" align=\"center\">\n" +
  "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                                    <tr>\n" +
  "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
  "                                    </tr>\n" +
  "                                  </table>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"paragraph_block block-8\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;\">\n" +
  "                                  <p style=\"margin: 0;\"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node=\"[object Object]\" prompt=\"Tell me more about Thu Duc City.\" style=\"text-decoration: underline; color: #0068a5;\">Thu Duc City</a>, <a node=\"[object Object]\" prompt=\"Tell me more about Ho Chi Minh City.\" style=\"text-decoration: underline; color: #0068a5;\">Ho Chi Minh City</a>,<em> Vietnam.<br></em></p>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                        </td>\n" +
  "                      </tr>\n" +
  "                    </tbody>\n" +
  "                  </table>\n" +
  "                </td>\n" +
  "              </tr>\n" +
  "            </tbody>\n" +
  "          </table><!-- End -->\n" +
  "        </td>\n" +
  "      </tr>\n" +
  "    </tbody>\n" +
  "  </table>\n" +
  "</body>\n" +
  "\n" +
  "</html>";
}
// const blockUser = () => {
//   return "<!DOCTYPE html>\n" +
//   "<html xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" lang=\"en\">\n" +
//   "\n" +
//   "<head>\n" +
//   "  <title></title>\n" +
//   "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
//   "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
//   "  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->\n" +
//   "  <style>\n" +
//   "    * {\n" +
//   "      box-sizing: border-box;\n" +
//   "    }\n" +
//   "\n" +
//   "    body {\n" +
//   "      margin: 0;\n" +
//   "      padding: 0; \n" +
//   "    }\n" +
//   "\n" +
//   "    a[x-apple-data-detectors] {\n" +
//   "      color: inherit !important;\n" +
//   "      text-decoration: inherit !important;\n" +
//   "    }\n" +
//   "\n" +
//   "    #MessageViewBody a {\n" +
//   "      color: inherit;\n" +
//   "      text-decoration: none;\n" +
//   "    }\n" +
//   "\n" +
//   "    p {\n" +
//   "      line-height: inherit\n" +
//   "    }\n" +
//   "\n" +
//   "    .desktop_hide,\n" +
//   "    .desktop_hide table {\n" +
//   "      mso-hide: all;\n" +
//   "      display: none;\n" +
//   "      max-height: 0px;\n" +
//   "      overflow: hidden;\n" +
//   "    }\n" +
//   "\n" +
//   "    .image_block img+div {\n" +
//   "      display: none;\n" +
//   "    }\n" +
//   "\n" +
//   "    @media (max-width:520px) {\n" +
//   "      .desktop_hide table.icons-inner {\n" +
//   "        display: inline-block !important;\n" +
//   "      }\n" +
//   "\n" +
//   "      .icons-inner {\n" +
//   "        text-align: center;\n" +
//   "      }\n" +
//   "\n" +
//   "      .icons-inner td {\n" +
//   "        margin: 0 auto;\n" +
//   "      }\n" +
//   "\n" +
//   "      .row-content {\n" +
//   "        width: 100% !important;\n" +
//   "      }\n" +
//   "\n" +
//   "      .mobile_hide {\n" +
//   "        display: none;\n" +
//   "      }\n" +
//   "\n" +
//   "      .stack .column {\n" +
//   "        width: 100%;\n" +
//   "        display: block;\n" +
//   "      }\n" +
//   "\n" +
//   "      .mobile_hide {\n" +
//   "        min-height: 0;\n" +
//   "        max-height: 0;\n" +
//   "        max-width: 0;\n" +
//   "        overflow: hidden;\n" +
//   "        font-size: 0px;\n" +
//   "      }\n" +
//   "\n" +
//   "      .desktop_hide,\n" +
//   "      .desktop_hide table {\n" +
//   "        display: table !important;\n" +
//   "        max-height: none !important;\n" +
//   "      }\n" +
//   "    }\n" +
//   "  </style>\n" +
//   "</head>\n" +
//   "\n" +
//   "<body style=\"background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;\">\n" +
//   "  <table class=\"nl-container\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;\">\n" +
//   "    <tbody>\n" +
//   "      <tr>\n" +
//   "        <td>\n" +
//   "          <table class=\"row row-1\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "            <tbody>\n" +
//   "              <tr>\n" +
//   "                <td>\n" +
//   "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;\" width=\"500\">\n" +
//   "                    <tbody>\n" +
//   "                      <tr>\n" +
//   "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
//   "                          <table class=\"image_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\" style=\"width:100%;padding-right:0px;padding-left:0px;\">\n" +
//   "                                <div class=\"alignment\" align=\"center\" style=\"line-height:10px\"><img src=\"https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png\" style=\"display: block; height: auto; border: 0; width: 100px; max-width: 100%;\" width=\"100\"></div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                        </td>\n" +
//   "                      </tr>\n" +
//   "                    </tbody>\n" +
//   "                  </table>\n" +
//   "                </td>\n" +
//   "              </tr>\n" +
//   "            </tbody>\n" +
//   "          </table>\n" +
//   "          <table class=\"row row-2\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "            <tbody>\n" +
//   "              <tr>\n" +
//   "                <td>\n" +
//   "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;\" width=\"500\">\n" +
//   "                    <tbody>\n" +
//   "                      <tr>\n" +
//   "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
//   "                          <table class=\"heading_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\" style=\"text-align:center;width:100%;\">\n" +
//   "                                <h1 style=\"margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">Khóa tài khoản</span></h1>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"divider_block block-2\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div class=\"alignment\" align=\"center\">\n" +
//   "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                                    <tr>\n" +
//   "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
//   "                                    </tr>\n" +
//   "                                  </table>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"paragraph_block block-3\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;\">\n" +
//   "                                  <p>\n" +
//   "                                    Chúng tôi rất tiếc phải thông báo rằng đã xảy ra nhiều vi phạm chính sách khi bạn sử dụng mạng xã hội của chúng tôi. Những hành động vi phạm này có thể dẫn đến tài khoản của bạn bị đình chỉ tạm thời hoặc thậm chí bị khóa vĩnh viễn. Chúng tôi xin gợi ý bạn xem xét và tuân thủ chặt chẽ các chính sách của chúng tôi để tránh mắc phải những hành động vi phạm tương tự trong tương lai. Chân thành cảm ơn bạn đã hiểu và tuân thủ.\n" +
//   "                                  </p> \n" +
//   "                                  <p style=\"font-style: italic;\">\n" +
//   "                                    Để biết thêm chi tiết hoặc có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua địa chỉ <a node=\"[object Object]\" prompt=\"Tell me more about Thu Duc City.\" style=\"text-decoration: underline; color: #0068a5;\"> email: hotrokeyhub@gmail.com</a>. Chúng tôi sẽ rất sẵn lòng hỗ trợ bạn trong quá trình giải quyết vấn đề. \n" +
//   "                                  </p>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"heading_block block-4\" width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                          </table>\n" +
//   "                          <table class=\"heading_block block-5\" width=\"100%\" border=\"0\" cellpadding=\"15\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <h2 style=\"margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\"></span></h2>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          \n" +
//   "                          <table class=\"heading_block block-4\" width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                          </table>\n" +
//   "                          <table class=\"heading_block block-5\" width=\"100%\" border=\"0\" cellpadding=\"15\" cellspacing=\"0\" role-presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <h2 style=\"margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\"></span></h2>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"heading_block block-6\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                          </table>\n" +
//   "                          <table class=\"divider_block block-7\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div class=\"alignment\" align=\"center\">\n" +
//   "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
//   "                                    <tr>\n" +
//   "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
//   "                                    </tr>\n" +
//   "                                  </table>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                          <table class=\"paragraph_block block-8\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
//   "                            <tr>\n" +
//   "                              <td class=\"pad\">\n" +
//   "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;\">\n" +
//   "                                  <p style=\"margin: 0;\"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node=\"[object Object]\" prompt=\"Tell me more about Thu Duc City.\" style=\"text-decoration: underline; color: #0068a5;\">Thu Duc City</a>, <a node=\"[object Object]\" prompt=\"Tell me more about Ho Chi Minh City.\" style=\"text-decoration: underline; color: #0068a5;\">Ho Chi Minh City</a>,<em> Vietnam.<br></em></p>\n" +
//   "                                </div>\n" +
//   "                              </td>\n" +
//   "                            </tr>\n" +
//   "                          </table>\n" +
//   "                        </td>\n" +
//   "                      </tr>\n" +
//   "                    </tbody>\n" +
//   "                  </table>\n" +
//   "                </td>\n" +
//   "              </tr>\n" +
//   "            </tbody>\n" +
//   "          </table><!-- End -->\n" +
//   "        </td>\n" +
//   "      </tr>\n" +
//   "    </tbody>\n" +
//   "  </table>\n" +
//   "</body>\n" +
//   "\n" +
//   "</html>";
// };
const blockUser = () => {
  return "<!DOCTYPE html>\n" +
  "<html xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\" lang=\"en\">\n" +
  "\n" +
  "<head>\n" +
  "  <title></title>\n" +
  "  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n" +
  "  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
  "  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]-->\n" +
  "  <style>\n" +
  "    * {\n" +
  "      box-sizing: border-box;\n" +
  "    }\n" +
  "\n" +
  "    body {\n" +
  "      margin: 0;\n" +
  "      padding: 0; \n" +
  "    }\n" +
  "\n" +
  "    a[x-apple-data-detectors] {\n" +
  "      color: inherit !important;\n" +
  "      text-decoration: inherit !important;\n" +
  "    }\n" +
  "\n" +
  "    #MessageViewBody a {\n" +
  "      color: inherit;\n" +
  "      text-decoration: none;\n" +
  "    }\n" +
  "\n" +
  "    p {\n" +
  "      line-height: inherit\n" +
  "    }\n" +
  "\n" +
  "    .desktop_hide,\n" +
  "    .desktop_hide table {\n" +
  "      mso-hide: all;\n" +
  "      display: none;\n" +
  "      max-height: 0px;\n" +
  "      overflow: hidden;\n" +
  "    }\n" +
  "\n" +
  "    .image_block img+div {\n" +
  "      display: none;\n" +
  "    }\n" +
  "\n" +
  "    @media (max-width:520px) {\n" +
  "      .desktop_hide table.icons-inner {\n" +
  "        display: inline-block !important;\n" +
  "      }\n" +
  "\n" +
  "      .icons-inner {\n" +
  "        text-align: center;\n" +
  "      }\n" +
  "\n" +
  "      .icons-inner td {\n" +
  "        margin: 0 auto;\n" +
  "      }\n" +
  "\n" +
  "      .row-content {\n" +
  "        width: 100% !important;\n" +
  "      }\n" +
  "\n" +
  "      .mobile_hide {\n" +
  "        display: none;\n" +
  "      }\n" +
  "\n" +
  "      .stack .column {\n" +
  "        width: 100%;\n" +
  "        display: block;\n" +
  "      }\n" +
  "\n" +
  "      .mobile_hide {\n" +
  "        min-height: 0;\n" +
  "        max-height: 0;\n" +
  "        max-width: 0;\n" +
  "        overflow: hidden;\n" +
  "        font-size: 0px;\n" +
  "      }\n" +
  "\n" +
  "      .desktop_hide,\n" +
  "      .desktop_hide table {\n" +
  "        display: table !important;\n" +
  "        max-height: none !important;\n" +
  "      }\n" +
  "    }\n" +
  "  </style>\n" +
  "</head>\n" +
  "\n" +
  "<body style=\"background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;\">\n" +
  "  <table class=\"nl-container\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;\">\n" +
  "    <tbody>\n" +
  "      <tr>\n" +
  "        <td>\n" +
  "          <table class=\"row row-1\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "            <tbody>\n" +
  "              <tr>\n" +
  "                <td>\n" +
  "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;\" width=\"500\">\n" +
  "                    <tbody>\n" +
  "                      <tr>\n" +
  "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
  "                          <table class=\"image_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\" style=\"width:100%;padding-right:0px;padding-left:0px;\">\n" +
  "                                <div class=\"alignment\" align=\"center\" style=\"line-height:10px\"><img src=\"https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png\" style=\"display: block; height: auto; border: 0; width: 100px; max-width: 100%;\" width=\"100\"></div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                        </td>\n" +
  "                      </tr>\n" +
  "                    </tbody>\n" +
  "                  </table>\n" +
  "                </td>\n" +
  "              </tr>\n" +
  "            </tbody>\n" +
  "          </table>\n" +
  "          <table class=\"row row-2\" align=\"center\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "            <tbody>\n" +
  "              <tr>\n" +
  "                <td>\n" +
  "                  <table class=\"row-content stack\" align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;\" width=\"500\">\n" +
  "                    <tbody>\n" +
  "                      <tr>\n" +
  "                        <td class=\"column column-1\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;\">\n" +
  "                          <table class=\"heading_block block-1\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\" style=\"text-align:center;width:100%;\">\n" +
  "                                <h1 style=\"margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\">Account Lock</span></h1>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"divider_block block-2\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div class=\"alignment\" align=\"center\">\n" +
  "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                                    <tr>\n" +
  "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
  "                                    </tr>\n" +
  "                                  </table>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"paragraph_block block-3\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;\">\n" +
  "                                  <p>\n" +
  "                                    We regret to inform you that multiple policy violations have occurred while using our social network. These violations may result in your account being temporarily suspended or permanently locked. We suggest that you review and strictly adhere to our policies to avoid similar actions in the future. Thank you for your understanding and compliance.\n" +
  "                                  </p> \n" +
  "                                  <p style=\"font-style: italic;\">\n" +
  "                                    For more details or any inquiries, please contact us at <a node=\"[object Object]\" prompt=\"Tell me more about Thu Duc City.\" style=\"text-decoration: underline; color: #0068a5;\"> email: hotrokeyhub@gmail.com</a>. We will be happy to assist you in resolving the issue. \n" +
  "                                  </p>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"heading_block block-4\" width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                          </table>\n" +
  "                          <table class=\"heading_block block-5\" width=\"100%\" border=\"0\" cellpadding=\"15\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <h2 style=\"margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\"></span></h2>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          \n" +
  "                          <table class=\"heading_block block-4\" width=\"100%\" border=\"0\" cellpadding=\"5\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                          </table>\n" +
  "                          <table class=\"heading_block block-5\" width=\"100%\" border=\"0\" cellpadding=\"15\" cellspacing=\"0\" role-presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <h2 style=\"margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;\"><span class=\"tinyMce-placeholder\"></span></h2>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"heading_block block-6\" width=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                          </table>\n" +
  "                          <table class=\"divider_block block-7\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div class=\"alignment\" align=\"center\">\n" +
  "                                  <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt;\">\n" +
  "                                    <tr>\n" +
  "                                      <td class=\"divider_inner\" style=\"font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;\"><span> </span></td>\n" +
  "                                    </tr>\n" +
  "                                  </table>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                          <table class=\"paragraph_block block-8\" width=\"100%\" border=\"0\" cellpadding=\"10\" cellspacing=\"0\" role=\"presentation\" style=\"mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;\">\n" +
  "                            <tr>\n" +
  "                              <td class=\"pad\">\n" +
  "                                <div style=\"color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;\">\n" +
  "                                  <p style=\"margin: 0;\"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node=\"[object Object]\" prompt=\"Tell me more about Thu Duc City.\" style=\"text-decoration: underline; color: #0068a5;\">Thu Duc City</a>, <a node=\"[object Object]\" prompt=\"Tell me more about Ho Chi Minh City.\" style=\"text-decoration: underline; color: #0068a5;\">Ho Chi Minh City</a>,<em> Vietnam.<br></em></p>\n" +
  "                                </div>\n" +
  "                              </td>\n" +
  "                            </tr>\n" +
  "                          </table>\n" +
  "                        </td>\n" +
  "                      </tr>\n" +
  "                    </tbody>\n" +
  "                  </table>\n" +
  "                </td>\n" +
  "              </tr>\n" +
  "            </tbody>\n" +
  "          </table><!-- End -->\n" +
  "        </td>\n" +
  "      </tr>\n" +
  "    </tbody>\n" +
  "  </table>\n" +
  "</body>\n" +
  "\n" +
  "</html>";
}
// const deleteTag= (tag)=>{
//   return `<!DOCTYPE html>
//   <html lang="en">
  
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   </head>
  
//   <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
//                                   <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="text-align:center;width:100%;">
//                                   <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Xóa Tag</span></h1>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">  
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                       <p>Chúng tôi muốn thông báo rằng Tags của bạn trên hệ thống của chúng tôi đã được phát hiện vi phạm vào quy tắc chung mà chúng tôi thiết lập. Tag đã được loại bỏ và chúng tôi đưa ra thông báo này để bạn nhận biết về tình trạng này.</p>
//                                       <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                           <tr>
//                                             <td class="pad">
//                                               <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Nội dung Tag</span></h3>
//                                             </td>
//                                           </tr>
//                                           <tr>
//                                             <td class="pad">
//                                               <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>${tag}</span></h3>
//                                             </td>
//                                           </tr>
//                                         </table>
//                                       <p>Chúng tôi muốn nhắc nhở bạn rằng việc tuân thủ quy tắc và điều khoản sử dụng là rất quan trọng để duy trì một môi trường sạch sẽ và tích cực cho cộng đồng.</p>
//                                   </div>           
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             </table>
//                             <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
//                                     <p style="margin: 0;"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,
//                                       Vietnam.<br></em></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table><!-- End -->
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
  
//   </html>`;
// }
const deleteTag = (tag) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Tag Deletion</span></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">  
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                      <p>We would like to inform you that the tags on our system have been found to violate the general rules we have established. The tag has been removed, and we are issuing this notification to make you aware of this situation.</p>
                                      <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="pad">
                                              <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Tag Content</span></h3>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="pad">
                                              <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>${tag}</span></h3>
                                            </td>
                                          </tr>
                                        </table>
                                      <p>We would like to remind you that complying with the rules and terms of use is very important to maintain a clean and positive environment for the community.</p>
                                  </div>           
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            </table>
                            <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                    <p style="margin: 0;"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,
                                      Vietnam.<br></em></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><!-- End -->
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  
  </html>`;
}
// const openAccount = (name)=>{
//   return `<!DOCTYPE html>
//   <html lang="en">
  
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   </head>
  
//   <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
//                                   <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="text-align:center;width:100%;">
//                                   <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Mở khóa tài khoản</span></h1>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">  
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                     <p>
//                                         Chúng tôi xin thông báo rằng tài khoản ${name} của bạn đã được mở khóa.
//                                     </p>
//                                 <p>
//                                     Chúng tôi mong muốn bạn tiếp tục sử dụng dịch vụ của chúng tôi một cách an toàn và có trách nhiệm.Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi qua brainiacservicehelp@gmail.com để được hỗ trợ.
//                                 </p>                                  </div>           
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             </table>
//                             <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
//                                     <p style="margin: 0;"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,
//                                       Vietnam.<br></em></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table><!-- End -->
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
  
//   </html>`
// }
const openAccount = (name) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Account Unlocked</span></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">  
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                    <p>
                                      We are pleased to inform you that your account ${name} has been unlocked.
                                    </p>
                                    <p>
                                      We hope you continue to use our services safely and responsibly. If you have any questions, please contact our customer support at brainiacservicehelp@gmail.com for assistance.
                                    </p> 
                                  </div>           
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            </table>
                            <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                    <p style="margin: 0;"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>, Vietnam.<br></em></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><!-- End -->
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  
  </html>`;
}

// const deleteComment= (title)=>{
//   return `<!DOCTYPE html>
//   <html lang="en">
  
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   </head>
  
//   <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
//                                   <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="text-align:center;width:100%;">
//                                   <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Xóa comment</span></h1>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">  
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                       <p>Chúng tôi muốn thông báo rằng Comment của bạn trên hệ thống của chúng tôi đã được phát hiện vi phạm vào quy tắc chung mà chúng tôi thiết lập. Comment đã được loại bỏ và chúng tôi đưa ra thông báo này để bạn nhận biết về tình trạng này.</p>
//                                       <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                           <tr>
//                                             <td class="pad">
//                                               <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Nội dung Comment</span></h3>
//                                             </td>
//                                           </tr>
//                                           <tr>
//                                             <td class="pad">
//                                               <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>${title}</span></h3>
//                                             </td>
//                                           </tr>
//                                         </table>
//                                       <p>Chúng tôi muốn nhắc nhở bạn rằng việc tuân thủ quy tắc và điều khoản sử dụng là rất quan trọng để duy trì một môi trường sạch sẽ và tích cực cho cộng đồng.</p>
//                                   </div>           
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             </table>
//                             <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
//                                     <p style="margin: 0;"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,
//                                       Vietnam.<br></em></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table><!-- End -->
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
  
//   </html>`;
// }
const deleteComment = (title) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Delete Comment</span></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">  
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                      <p>We would like to inform you that your comment on our system has been found to violate the general rules we have established. The comment has been removed, and we are issuing this notification to make you aware of this situation.</p>
                                      <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="pad">
                                              <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Comment Content</span></h3>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="pad">
                                              <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>${title}</span></h3>
                                            </td>
                                          </tr>
                                        </table>
                                      <p>We would like to remind you that complying with the rules and terms of use is very important to maintain a clean and positive environment for the community.</p>
                                  </div>           
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            </table>
                            <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                    <p style="margin: 0;"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>, Vietnam.<br></em></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><!-- End -->
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  
  </html>`;
}

// const deleteCategory = (name)=>{
//   return `<!DOCTYPE html>
//   <html lang="en">
  
//   <head>
//     <title></title>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   </head>
  
//   <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
//     <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
//       <tbody>
//         <tr>
//           <td>
//             <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
//                                   <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//               <tbody>
//                 <tr>
//                   <td>
//                     <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
//                       <tbody>
//                         <tr>
//                           <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
//                             <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad" style="text-align:center;width:100%;">
//                                   <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Xóa nhóm</span></h1>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">  
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
//                                       <p>Chúng tôi muốn thông báo rằng nhóm của bạn trên hệ thống của chúng tôi đã được phát hiện vi phạm vào quy tắc chung mà chúng tôi thiết lập. Nhóm đã được loại bỏ và chúng tôi đưa ra thông báo này để bạn nhận biết về tình trạng này.</p>
//                                       <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                           <tr>
//                                             <td class="pad">
//                                               <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Tên nhóm</span></h3>
//                                             </td>
//                                           </tr>
//                                           <tr>
//                                             <td class="pad">
//                                               <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>${name}</span></h3>
//                                             </td>
//                                           </tr>
//                                         </table>
//                                       <p>Chúng tôi muốn nhắc nhở bạn rằng việc tuân thủ quy tắc và điều khoản sử dụng là rất quan trọng để duy trì một môi trường sạch sẽ và tích cực cho cộng đồng.</p>
//                                   </div>           
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                             </table>
//                             <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                               <tr>
//                                 <td class="pad">
//                                   <div class="alignment" align="center">
//                                     <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
//                                       <tr>
//                                         <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
//                                       </tr>
//                                     </table>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                             <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
//                               <tr>
//                                 <td class="pad">
//                                   <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
//                                     <p style="margin: 0;"><em> </em><br><em>Email được gửi từ Hệ thống của <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>,
//                                       Vietnam.<br></em></p>
//                                   </div>
//                                 </td>
//                               </tr>
//                             </table>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </td>
//                 </tr>
//               </tbody>
//             </table><!-- End -->
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   </body>
  
//   </html>`;
// }
const deleteCategory = (name) => {
  return `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  
  <body style="background-color: #FFFFFF; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF;">
      <tbody>
        <tr>
          <td>
            <table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="image_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="width:100%;padding-right:0px;padding-left:0px;">
                                  <div class="alignment" align="center" style="line-height:10px"><img src="https://w7.pngwing.com/pngs/131/200/png-transparent-black-key-icon-key-key-angle-text-grey.png" style="display: block; height: auto; border: 0; width: 100px; max-width: 100%;" width="100"></div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table class="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
              <tbody>
                <tr>
                  <td>
                    <table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 500px;" width="500">
                      <tbody>
                        <tr>
                          <td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                            <table class="heading_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad" style="text-align:center;width:100%;">
                                  <h1 style="margin: 0; color: #ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 23px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Delete Category</span></h1>
                                </td>
                              </tr>
                            </table>
                            <table class="divider_block block-2" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">  
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:14px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:16.8px;">
                                      <p>We would like to inform you that your category on our system has been found to violate the general rules we have established. The category has been removed, and we are issuing this notification to make you aware of this situation.</p>
                                      <table class="heading_block block-4" width="100%" border="0" cellpadding="5" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                          <tr>
                                            <td class="pad">
                                              <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>Category Name</span></h3>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td class="pad">
                                              <h3 style="margin: 0; color: #555555; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span>${name}</span></h3>
                                            </td>
                                          </tr>
                                        </table>
                                      <p>We would like to remind you that complying with the rules and terms of use is very important to maintain a clean and positive environment for the community.</p>
                                  </div>           
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-5" width="100%" border="0" cellpadding="15" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <h2 style="margin: 0; color:#ba3d4f; direction: ltr; font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;"><span></span></h2>
                                </td>
                              </tr>
                            </table>
                            <table class="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                            </table>
                            <table class="divider_block block-7" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                              <tr>
                                <td class="pad">
                                  <div class="alignment" align="center">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                      <tr>
                                        <td class="divider_inner" style="font-size: 1px; line-height: 1px; border-top: 1px solid #BBBBBB;"><span> </span></td>
                                      </tr>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            </table>
                            <table class="paragraph_block block-8" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                              <tr>
                                <td class="pad">
                                  <div style="color:#000000;direction:ltr;font-family:Arial, 'Helvetica Neue', Helvetica, sans-serif;font-size:13px;font-weight:400;letter-spacing:0px;line-height:120%;text-align:center;mso-line-height-alt:15.6px;">
                                    <p style="margin: 0;"><em> </em><br><em>Email sent from the system of <u>Brainiac Social Media</u><br>No. 1 Vo Van Ngan Street, Linh Chieu Ward, </em><a node="[object Object]" prompt="Tell me more about Thu Duc City." style="text-decoration: underline; color: #0068a5;">Thu Duc City</a>, <a node="[object Object]" prompt="Tell me more about Ho Chi Minh City." style="text-decoration: underline; color: #0068a5;">Ho Chi Minh City</a>, Vietnam.<br></em></p>
                                  </div>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table><!-- End -->
          </td>
        </tr>
      </tbody>
    </table>
  </body>
  
  </html>`;
}
const sendVerificationEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });

  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Account Verification OTP - BRAINIAC SOCIAL MEDIA',
    html: generateEmail(otp),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};
const sendInformDeleteBlog = async (email, title) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });
  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Delete Blog!!!!!',
    html: deleteBlog(title),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log('Sent email Delete BLog successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};
const sendInformDeleteGroup = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });
  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Delete Group',
    html: deleteCategory(name),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log('Sent email Delete Tag successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};
const sendInformDeleteTag = async (email, tag) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });
  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Delete Tags',
    html: deleteTag(tag),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------')
    console.log('Sent email Delete Tag successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};
const sendInformWarningUser = async (email, reason) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });
  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Violation Warning - BRAINIAC SOCIAL MEDIA',
    html: warningUser(reason),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------');
    console.log('Sent email successfully');
  } catch (error) {
    console.error('Error sending warning email:', error);
    throw error;
  }
};

const sendInformBlockUser = async (email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });
  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Violation - BRAINIAC SOCIAL MEDIA',
    html: blockUser(),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------');
    console.log('Sent email to inform Block Account successfully');
  } catch (error) {
    console.error('Error sending block account email:', error);
    throw error;
  }
};

const sendInformDeleteComment = async (email, title) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });
  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Violation - BRAINIAC SOCIAL MEDIA',
    html: deleteComment(title),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------');
    console.log('Sent email to inform about comment deletion successfully');
  } catch (error) {
    console.error('Error sending comment deletion email:', error);
    throw error;
  }
};

const sendInformOpenAccount = async (email, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      // user: 'brainiacservicehelp@gmail.com', // Your Gmail email address
      // pass: 'oegwbkflmskqidun', // Your Gmail email password
      user: 'baboga12@gmail.com', // Your Gmail email address
      pass: 'gommwlbokkhmtqln', //
    },
  });
  const mailOptions = {
    from: 'brainiacservicehelp@gmail.com',
    to: email,
    subject: 'Open Account - BRAINIAC SOCIAL MEDIA',
    html: openAccount(name),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('--------------------------------------------------------------------------------------------------------------------');
    console.log('Sent email to inform about account opening successfully');
  } catch (error) {
    console.error('Error sending account opening email:', error);
    throw error;
  }
};
module.exports = {
  sendVerificationEmail,
  sendInformOpenAccount,
  sendInformDeleteBlog,
  sendInformDeleteTag,
  sendInformWarningUser,
  sendInformBlockUser,
  sendInformDeleteComment,sendInformDeleteGroup
};
