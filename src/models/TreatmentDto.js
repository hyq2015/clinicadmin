export default class TreatmentDto {
    constructor(obj = {}){
        this._id = obj.id;
        this._code = obj.code;
        this._doctor_name = obj.doctor_name;
        this._user_name = obj.name;
        this._phone = obj.phone;
        this._price = obj.price;
        this._advice = obj.advice;
        this._message = obj.message;
    }

    tableData(){
        return {
            id: this._id,
            code: this._code,
            doctor_name: this._doctor_name,
            user_name: this._user_name,
            phone: this._phone,
            price: this._price,
            advice: this._advice,
            message: this._message,
        }
    }
}