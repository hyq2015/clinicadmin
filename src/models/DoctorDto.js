export default class DoctorDto {
    constructor(obj = {}) {
        this._id = obj.id;
        this._clinic_id = obj.clinic_id;
        this._create_time = obj.create_time;
        this._description = obj.description;
        this._image_url = obj.image_url;
        this._name = obj.name;
        this._phone = obj.phone;
        this._rank = obj.rank;
        this._score = obj.score;
        this._update_time = obj.update_time;
    }
    tableData() {
        return {
            id: this._id,
            name: this._name,
            image_url: this._image_url,
            rank: this._rank,
            score: this._score,
            description: this._description,
            clinic: this._clinic_id,
            phone: this._phone
        };
    }
}
