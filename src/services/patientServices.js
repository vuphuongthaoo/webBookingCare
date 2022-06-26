import db from "../models/index";
require("dotenv").config();
const { reject } = require("lodash");
import emailService from "./emailService";

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        await emailService.sendSimpleEmail({
          receiverEmail: data.email,
          patientName: "Vũ thảo patient name",
          time: "8:00 - 9:00 Chủ nhật 26/06/2022",
          doctorName: "Vũ Thảo",
          redirectLink:
            "https://www.youtube.com/channel/UC9l2RhMEPCIgDyGCH8ijtPQ",
        });

        //ipsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          default: {
            email: data.email,
            roleId: "R3",
          },
        });
        //create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientID: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientID: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Save infor patient succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppointment: postBookAppointment,
};
