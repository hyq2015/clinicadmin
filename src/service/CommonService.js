import xhr from "../utils/xhr";

/**
 * 查询用户信息
 * @param userId
 * @returns {*}
 */
export function getUserInfo(id) {
    return xhr({
        method: "get",
        url: "/member/get",
        data: {
            id: id
        }
    });
}

/**
 * 查询诊所信息
 * @param clinicId
 * @returns {*}
 */
export function getClinicInfo(id) {
    return xhr({
        method: "get",
        url: "/clinic/get",
        data: {
            id: id
        }
    });
}

/**
 * 查询医生信息
 * @param doctorId
 * @returns {*}
 */
export function getDoctorInfo(id) {
    return xhr({
        method: "get",
        url: "/doctor/get",
        data: {
            id: id
        }
    });
}

/**
 * 查询药品详情
 * @param medicineId
 * @returns {*}
 */
export function getMedicineInfo(id) {
    return xhr({
        method: "get",
        url: "/medicine/get",
        data: {
            id: id
        }
    });
}

/**
 * 查询预约详情
 * @param appointmentId
 * @returns {*}
 */
export function getAppointmentDetail(id) {
    return xhr({
        method: "get",
        url: "/subscribe/get",
        data: {
            id: id
        }
    });
}

/**
 * 查询就诊详情
 * @param id
 * @returns {*}
 */
export function getTreatmentDetail(id) {
    return xhr({
        method: "get",
        url: "/diagnosis/get",
        data: {
            id: id
        }
    });
}

/**
 * 查询处方信息
 * @param id
 * @returns {*}
 */
export function getOrderInfo(id) {
    return xhr({
        method: "get",
        url: "/order/get",
        data: {
            id: id
        }
    });
}
