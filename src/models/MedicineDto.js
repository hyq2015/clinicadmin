export default class MedicineDto {
    constructor(obj = {}){
        this._id = obj.id;
        this._code = obj.code;
        this._title = obj.title;
        this._specification = obj.specification;
        this._sale_price = obj.sale_price;
        this._dosage = obj.dosage;
        this._usage = obj.usage;
        this._frequency = obj.frequency;
    }
    tableData() {
        return {
            id: this._id,
            code: this._code,
            title: this._title,
            specification: this._specification,
            sale_price: this._sale_price,
            dosage: this._dosage,
            usage: this._usage,
            frequency: this._frequency,
        }
    }
}