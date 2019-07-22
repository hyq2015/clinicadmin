import timeUtil from "@rickyhuang/timeutil/src/index";
export default class DoctorDto {
    constructor(obj = {}) {
        this._id = obj.id;
        this._age = obj.age;
        this._allergic = obj.allergic;
        this._book_time = obj.book_time;
        this._clinic_id = obj.clinic_id;
        this._create_time = obj.create_time;
        this._description = obj.description;
        this._doctor_id = obj.doctor_id;
        this._doctor_name = obj.doctor_name;
        this._image_url = obj.image_url;
        this._member_id = obj.member_id;
        this._update_time = obj.update_time;
        this._phone = obj.phone;
        this._name = obj.name;
    }
    tableData() {
        return {
            id: this._id,
            clinic_id: this._clinic_id,
            member_id: this._member_id,
            doctor_id: this._doctor_id,
            doctor_name: this._doctor_name,
            name: this._name,
            image_url: this._image_url,
            phone: this._phone,
            description: this._description,
            book_time: transformTime(this._book_time)
        };
    }
}
function transformTime(str) {
    return timeUtil(new Date(str).getTime(),"yyyy-MM-dd hh") + "点"
}
