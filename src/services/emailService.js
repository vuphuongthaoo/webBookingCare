require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"BookingCare 👻!" <thaoco4120@gmail.com>',
    to: dataSend.receiverEmail,
    subject: "Thông tin đặt lịch khám bệnh tại Website BookingCare",
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được Email này vì đã đặt lịch khám bệnh online trên trang Website BookingCare của chúng tôi.</p>
    <p>Thông tin đặt lịch khám bệnh của bạn như sau:</p>
    <div>
    <b>Thời gian: ${dataSend.time}</b>
    </div>
    <div>
    <b>Bác sĩ: ${dataSend.doctorName}</b>
    </div>
    <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới
    để xác nhận và hoàn tất tủ tục đặt lịch khám bệnh của bạn</p>
    <div>
    <a href=${dataSend.redirectLink} target="_black">Click here</a></div>
    <div>Cảm ơn bạn, đã tin tưởng và đặt lịch khám bệnh tại Bookingcare. Chúc bạn có một ngày tốt lành bên gia đình và người thân!</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on our BookingCare Website.</p>
    <p>Your appointment information is as follows:</p>
    <div>
    <b>Time: ${dataSend.time}</b>
    </div>
    <div>
    <b>Doctor: ${dataSend.doctorName}</b>
    </div>
    <p>If the above information is correct, please click on the link below to confirm and complete your medical appointment.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_black">Click here</a></div>
    <div>Thank you for trusting and booking a medical appointment at Bookingcare. Have a nice day with your family and loved ones!</div>
    `;
  }

  return result;
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
