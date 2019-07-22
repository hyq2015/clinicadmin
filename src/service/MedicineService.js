import xhr from "../utils/xhr";
import MedicineDto from "../models/MedicineDto";
export function getMedicineList(obj) {
    return xhr({
        method: "get",
        url: "/medicine/list",
        data: obj
    }).then(res => {
        return {
            total: res.total,
            tableData: res.data.map((item) =>
                new MedicineDto(item).tableData()
            )
        }
    });
}
