import xhr from "../utils/xhr";
import timeUtil from "@rickyhuang/timeutil/src";


export function addDignosis(obj) {
    return xhr({
        method: "post",
        url: "diagnosis/add",
        data: obj
    }).then(res => {
        return {
            diagnosis_id: res.data.id,
        }
    });
}

export function editDignosis(obj) {
    return xhr({
        method: "post",
        url: "diagnosis/put",
        data: obj
    }).then(res => {
        return {
            diagnosis_id: res.data.id,
        }
    });
}



export function addPrescription(obj) {
    return xhr({
        method: "post",
        url: "/order/add",
        data: obj
    }).then(res => {
        return {
            order_id: res.data.id
        }
    });
}

export function editPrescription(obj) {
    return xhr({
        method: "post",
        url: "/order/put",
        data: obj
    }).then(res => {
        return {
            order_id: res.data.id
        }
    });
}

export function addMedicine(obj) {
    let xhrList = [];
    for (let item of obj.data) {
        item.order_id = obj.order_id;
        if(item.medicine_id){
            item.medicine_id = item.medicine_id;
        }   else {
            item.medicine_id = item.id;
        }
        xhrList.push(
            addMedicineItem(item)
        )
    }
}
export function addMedicineItem(obj) {
    return xhr({
        method: "post",
        url: "/order/additem",
        data: obj
    })
}

export function deleteMedicine(obj) {
    let xhrList = [];
    for (let item of obj.data) {
        xhrList.push(
            deleteMedicineItem(item.id)
        )
    }
}
export function deleteMedicineItem(id) {
    return xhr({
        method: "get",
        url: "/order/removeitem",
        data: {
            id :id
        }
    })
}

export function getTreatmentCode() {
    return xhr({
        method: "get",
        url: "/diagnosis/autocode",
    }).then(res => {
        return {
            code: res.data
        }
    })

}

export function editUserDetail(obj) {
    return xhr({
        method: "post",
        url: "/member/put",
        data:obj,
    }).then(res => {
        return {

        }
    })
}

export function getMedicineItem(obj) {
    return xhr({
        method: "get",
        url: "/order/listitem",
        data: obj
    }).then(res => {
        return {
            data: res.data
        }
    });
}

export function getTreatmentDetail(obj) {
    return xhr({
        method: "get",
        url: "/diagnosis/get",
        data: obj
    }).then(res => {
        return {
            data: res.data
        }
    });
}

export function uploadPhoto(obj) {
    return xhr({
        method: "post",
        url: "/face/uploadphoto",
        data: obj,
        headers: {
            "Content-Type": "application/form-data"
        }
    }).then(res => {
        return {
            data: res.data
        }
    });
}
