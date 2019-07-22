import xhr from "../utils/xhr";
import DoctorDto from "../models/DoctorDto";
export function getDoctorList(obj) {
    return xhr({
        method: "get",
        url: "/doctor/list",
        data: obj
    }).then(res => {
        return {
            total: res.total,
            tableData: res.data.map((item) =>
                new DoctorDto(item).tableData()
            )
        }
    });
}
