<template>
    <div class="main">
        <Header title="就诊详情"/>
        <div class="content">
            <div>
                就诊号 <span>{{treatmentForm.code}}</span>
            </div>
            <div class="patient-information">
                <div class="form-title">患者基本信息</div>
                <el-form ref="userInfo" :model="userInfo" label-width="80px" class="el-form-padding">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="姓名">
                                <span>{{userInfo.name}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="性别">
                                <span>{{userInfo.sex}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="出生日期">
                                <span>{{userInfo.birthday}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="年龄">
                                <span>{{userInfo.age}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="身高">
                                <span>{{userInfo.height}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="体重">
                                <span>{{userInfo.weight}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="4">
                            <el-form-item label="住址">
                                <span>{{userInfo.address}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="照片">
                                <el-image
                                        style="width: 100px; height: 100px"
                                        :src="userInfo.image_url"
                                        fit="fill"></el-image>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="健康描述">
                                <span>{{userInfo.description}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="过敏史">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 4, maxRows: 6}"
                                        v-model="userInfo.allergic">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
            </div>
            <div class="treatment-information">
                <div class="form-title">就诊信息</div>
                <el-form ref="form" :model="treatmentForm" label-width="80px" class="el-form-padding">
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="体温">
                                <el-input v-model="treatmentForm.temperature">
                                    <template slot="append">℃</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="脉搏">
                                <el-input v-model="treatmentForm.pulse">
                                    <template slot="append">次/分钟</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="血压">
                                <el-input v-model="treatmentForm.blood_pressure">
                                    <template slot="append">mmHg</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="呼吸">
                                <el-input v-model="treatmentForm.respiratory">
                                    <template slot="append">次/分钟</template>
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="医生">
                                <el-select v-model="treatmentForm.doctor_id" placeholder="请选择">
                                    <el-option
                                            v-for="item in doctorListData"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="诊断">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 4, maxRows: 6}"
                                        v-model="treatmentForm.illness">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="处理意见">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 4, maxRows: 6}"
                                        v-model="treatmentForm.disposal">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="医嘱">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 4, maxRows: 6}"
                                        v-model="treatmentForm.advice">
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="备注">
                                <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 4, maxRows: 6}"
                                        v-model="treatmentForm.remark">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="prescription-information">
                <div class="form-title">处方信息</div>
                <el-row class="prescription-main">
                    <el-col :span="15" class="prescription-box">
                        <div class="prescription-title">处方</div>
                        <div class="prescription-user-msg">
                            <el-row>
                                <el-col :span="6">
                                    <div class="prescription-label">就诊号</div>
                                    <div class="prescription-content">{{treatmentForm.code}}</div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="prescription-label">姓名</div>
                                    <div class="prescription-content">{{userInfo.name}}</div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="prescription-label">性别</div>
                                    <div class="prescription-content">{{userInfo.sex}}</div>
                                </el-col>
                                <el-col :span="6">
                                    <div class="prescription-label">年龄</div>
                                    <div class="prescription-content">{{userInfo.age}}</div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col>
                                    <div class="prescription-label">处方类型</div>
                                    <div class="prescription-content">
                                        <el-select v-model="type" placeholder="请选择">
                                            <el-option
                                                    v-for="item in typeData"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>

                                </el-col>

                            </el-row>
                        </div>
                        <div class="medicine-list-area">
                            <div class="medicine-list-title">药品清单</div>
                            <el-table
                                    :data="prescriptionData"
                                    style="width: 100%">
                                <el-table-column
                                        label="序号"
                                        type="index"
                                        width="50">
                                </el-table-column>
                                <el-table-column
                                        prop="title"
                                        label="名称"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        label="一次用量"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.dosage"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="用法"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.usage" :disabled="usageDisabled"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="频率"
                                        width="120">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.frequency"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="数量"
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.amount" @change="countTotalPrice"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="zip"
                                        fixed="right"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="handleMedicineDelete(scope.row)" type="text" size="small">
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                    <el-col :span="8" class="medicine-box">
                        <div class="search-area">
                            <el-input placeholder="请输入内容" v-model="medicineForm.title">
                                <template slot="append">
                                    <el-button icon="el-icon-search" @click="searchMedicine()">搜索</el-button>
                                </template>
                            </el-input>
                        </div>
                        <div>
                            <el-table
                                    :data="medicineData"
                                    style="width: 100%">
                                <el-table-column
                                        prop="title"
                                        label="名称"
                                        width="130">
                                </el-table-column>
                                <el-table-column
                                        prop="specification"
                                        label="规格"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="sale_price"
                                        label="价格"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="zip"
                                        fixed="right"
                                        label="操作">
                                    <template slot-scope="scope">
                                        <el-button @click="handleAdd(scope.row)" type="text" size="small">添加</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="price-row">
                    <el-col :span="4" class="price-title">当前药品总价 <span class="totle-price">{{totalPrice}}</span>元
                    </el-col>
                    <el-col :span="1" class="price-title">优惠价</el-col>
                    <el-col :span="3">
                        <el-input v-model="price">
                            <template slot="append">元</template>
                        </el-input>
                    </el-col>

                </el-row>
                <el-row>
                    <el-button @click="beforeSaveAll">保存以上信息</el-button>
                </el-row>

                <div class="form-title">回访记录</div>
                <div class="talk-area">
                    <div v-for="item in msgData" :key="item.id" class="content-wrap">
                        <div v-if="item.sender" class="doctorArea">
                            <div class="talk-box">{{item.content}}</div>
                            <div class="user-photo">
                                <el-avatar size="large" :src="item.doctor_image"></el-avatar>
                                <div>{{item.doctor_name}}</div>
                            </div>
                        </div>
                        <div v-else class="patientArea">
                            <div class="user-photo">
                                <el-avatar size="large" :src="item.member_image"></el-avatar>
                                <div>{{item.member_name}}</div>
                            </div>
                            <div class="talk-box">{{item.content}}</div>
                        </div>
                    </div>
                </div>
                <div class="back-visit">
                    <el-input placeholder="请输入内容" v-model="inputMsg">
                        <template slot="append">
                            <el-button @click="sendMessage" icon="el-icon-search">回访</el-button>
                        </template>
                    </el-input>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "./Header";
    import timeUtil from "@rickyhuang/timeutil/src/index";
    import {getMedicineList} from "../service/MedicineService";
    import {getUserInfo} from "../service/CommonService";
    import {
        deleteMedicine,
        getTreatmentDetail,
        getMedicineItem,
        editDignosis,
        editPrescription,
        addMedicine,
        editUserDetail
    } from "../service/DiagnosisService";
    import {getDoctorList} from "../service/DoctorService";
    import {getMessageList, sendMessage} from "../service/TreatmentService";

    export default {
        name: "TreatmentDetail",
        components: {
            Header,
        },
        data() {
            return {
                inputMsg: '',
                usageDisabled: true,
                medicineData: [],
                medicineForm: {
                    page: 1,
                    page_size: 9999,
                    title: "",
                },
                prescriptionData: [],
                prescriptionDataCopy: [],
                userInfo: {
                    name: ''
                },
                treatmentForm: {
                    doctor_id: "",
                    temperature: "",
                    pulse: "",
                    blood_pressure: "",
                    illness: "",
                    disposal: "",
                    advice: "",
                    remark: "",
                },
                code: "",
                doctorListData: [],
                totalPrice: 0,
                price: '',
                type: 0,
                typeData: [
                    {
                        value: 0,
                        label: '普通'
                    }
                ],
                msgData: [
                    /*{
                        "id": 2,
                        "content": "还没",
                        "image_url": null,
                        "diagnosis_id": 1,
                        "sender": 0,
                        "read_state": 0,
                        "create_time": "2019-06-25T09:30:42.000Z",
                        "code": "20190625001",
                        "illness": "无",
                        "member_name": "赵云启",
                        "member_sex": "男",
                        "member_image": null,
                        "doctor_name": "李顺",
                        "doctor_image": "http://cloud.designchn.com/u/ftp/D03162457/20190624/150821289.jpg"
                    }, {
                        "id": 1,
                        "content": "病好了吗",
                        "image_url": null,
                        "diagnosis_id": 1,
                        "sender": 1,
                        "read_state": 1,
                        "create_time": "2019-06-25T09:29:58.000Z",
                        "code": "20190625001",
                        "illness": "无",
                        "member_name": "赵云启",
                        "member_sex": "男",
                        "member_image": null,
                        "doctor_name": "李顺",
                        "doctor_image": "http://cloud.designchn.com/u/ftp/D03162457/20190624/150821289.jpg"
                    }*/
                ],
            }
        },
        created() {
            this.getMedicineList();
            this.getTreatmentDetail();
            this.getMessageList();
            getDoctorList({page: 1, page_size: 9999})
                .then(res => {
                    this.doctorListData = res.tableData;
                })
        },
        mounted() {

        },
        methods: {
            getMessageList() {
                getMessageList({diagnosis_id: this.$router.history.current.query.id})
                    .then(res => {
                        this.msgData = res.data.reverse();
                    })
            },
            sendMessage() {
                if (this.inputMsg) {
                    sendMessage({
                        diagnosis_id: this.$router.history.current.query.id,
                        content: this.inputMsg,
                        sender: 1,
                    }).then(() => {
                        this.inputMsg = "";
                        this.getMessageList();
                        })
                }   else {
                    this.$message.error("发送消息不能为空;")
                }

            },
            getUserInfo(mid) {
                getUserInfo(mid)
                    .then(res => {
                        this.userInfo = res.data;
                        this.userInfo.birthday = timeUtil(this.userInfo.birthday, "yyyy-MM-dd");
                    });
            },
            getMedicineItem(obj) {
                getMedicineItem(obj)
                    .then(res => {
                        this.prescriptionData = res.data;
                        this.prescriptionDataCopy = JSON.parse(JSON.stringify(res.data));
                    })
            },
            getTreatmentDetail() {
                getTreatmentDetail({id: this.$router.history.current.query.id})
                    .then(res => {
                        this.treatmentForm = res.data;
                        this.totalPrice = this.treatmentForm.order.refer_price;
                        this.type = this.treatmentForm.order.type;
                        this.price = this.treatmentForm.order.price;
                        this.getUserInfo(this.treatmentForm.member_id);
                        this.getMedicineItem({order_id: this.treatmentForm.order.id});
                    })

            },
            getMedicineList() {
                getMedicineList(this.medicineForm)
                    .then(res => {
                        this.medicineData = res.tableData;
                    })
            },
            searchMedicine() {
                this.getMedicineList();
            },
            handleAdd(row) {
                let addFlag = true;
                let newRow = Object.assign({}, row);
                newRow.amount = newRow.amount || 1;
                if (this.prescriptionData.length > 0) {
                    for (let i = 0, len = this.prescriptionData.length; i < len; i++) {
                        if (this.prescriptionData[i].id === newRow.id || this.prescriptionData[i].medicine_id === newRow.id) {
                            this.prescriptionData[i].amount += 1;
                            this.$set(this.prescriptionData, i, this.prescriptionData[i]);
                            addFlag = false;
                            break;
                        }
                    }
                    if (addFlag) {
                        this.prescriptionData.push(newRow);
                    }
                } else {
                    this.prescriptionData.push(newRow);
                }
                addFlag = true;
                this.countTotalPrice();
            },
            handleMedicineDelete(row) {
                let spliceIndex = null;
                for (let i = 0, len = this.prescriptionData.length; i < len; i++) {
                    if (this.prescriptionData[i].id === row.id) {
                        spliceIndex = i;
                    }
                }
                if (spliceIndex != null) {
                    this.prescriptionData.splice(spliceIndex, 1);

                }
                this.countTotalPrice();
            },
            countTotalPrice() {
                let prescriptionData = this.prescriptionData;
                let totalPrice = 0;
                if (prescriptionData.length > 0) {
                    prescriptionData.map(item => {
                        totalPrice += parseInt(item.sale_price) * parseInt(item.amount)
                    })
                }

                this.totalPrice = totalPrice;
                this.price = totalPrice;
            },
            beforeSaveAll() {
                let flag = false;
                switch (true) {
                    case !this.treatmentForm.doctor_id:
                        this.$message.error('就诊信息内的医生选项不能为空!');
                        break;
                    case !this.price:
                        this.$message.error('请填写优惠价!');
                        break;
                    case !this.treatmentForm.illness:
                        this.$message.error('请填写诊断!');
                        break;
                    default:
                        flag = true;
                        break;
                }

                if (flag) {
                    this.saveAll();
                }
            },
            async saveAll() {
                /* await editUserDetail(this.userInfo);*/
                await editDignosis(this.treatmentForm);
                await editPrescription({
                    id: this.treatmentForm.order.id,
                    refer_price: this.totalPrice,
                    price: this.price,
                    type: this.type
                });
                if (!(JSON.stringify(this.prescriptionData) === JSON.stringify(this.prescriptionDataCopy))) {
                    await deleteMedicine({data: this.prescriptionDataCopy});
                    await addMedicine({order_id: this.treatmentForm.order.id, data: this.prescriptionData});
                }
                this.$message.success('保存成功!');
                await setTimeout(() => {
                    this.$router.push("/treatment");
                }, 500)
            },

        }
    }
</script>

<style scoped lang="scss" src="../assets/styles/TreatmentDetail.scss">

</style>