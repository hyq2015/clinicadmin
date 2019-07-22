import xhr from "../utils/xhr";
import AppointmentDto from "../models/AppointmentDto";
import {getUserInfo, getClinicInfo, getAppointmentDetail, getDoctorInfo} from "./CommonService";
import timeUtil from "@rickyhuang/timeutil/src/index";
import axios from "axios";
export function getAppointmentList(obj) {
    return xhr({
        method: "get",
        url: "/subscribe/list",
        data: obj
    }).then(res => {
        return {
            total: res.total,
            tableData: res.data.map((item) =>
                new AppointmentDto(item).tableData()
            )
        }
    });
}
export function getAppointPageDetailInfo(appointmentId, clinicId, memberId, doctorId) {
    const arr = [getAppointmentDetail(appointmentId), getUserInfo(memberId), getClinicInfo(clinicId)];
    if (doctorId && doctorId !== "null") {
        arr.push(getDoctorInfo(doctorId));
    }
    return axios.all(arr)
        .then(res => {
            return {
                appointDate: timeUtil(res[0].data.book_time, "yyyy-MM-dd hh") + "点",
                userAvatar: res[1].data.image_url,
                userName: res[1].data.name,
                userPhone: res[1].data.phone,
                userAge: res[1].data.age,
                userGender: res[1].data.sex,
                clinicName: res[2].data.title,
                doctorName: res[3] ? res[3].data.name : null,
                desc: res[0].data.description
            };
        });
}

