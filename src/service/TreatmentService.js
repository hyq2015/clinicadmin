import xhr from "../utils/xhr";
import TreatmentDto from "../models/TreatmentDto";
export function getTreatmentList(obj) {
    return xhr({
        method: "get",
        url: "/diagnosis/list",
        data: obj
    }).then(res => {
        return {
            total: res.total,
            tableData: res.data.map((item) =>
                new TreatmentDto(item).tableData()
            )
        }
    });
}

export function getMessageList(obj) {
    return xhr({
        method: "get",
        url: "/message/list",
        data: obj
    }).then(res => {
        return {
            data: res.data
        }
    });
}
export function sendMessage(obj) {
    return xhr({
        method: "post",
        url: "/message/send",
        data: obj
    });
}