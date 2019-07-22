export default class FaceUserListDto {
    constructor (obj = {}) {
        this._id = obj.id;
        this._face_id = obj.face_id;
        this._sex = obj.sex;
        this._age = obj.age;
        this._avatar = obj.avatar;
        this._device_id = obj.device_id;
        this._visit_time = obj.visit_time;
    }
}
