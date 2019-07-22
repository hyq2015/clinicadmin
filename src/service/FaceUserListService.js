import xhr from "../utils/xhr";
export function getList(obj) {
    return xhr({
        method: "get",
        url: "face/list",
        data: obj
    })
}

export function addMember(obj) {
    return xhr({
        method: "post",
        url: "member/add",
        data: obj
    })
}
