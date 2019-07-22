<template>
    <div>
        <Header
            title="用户就诊记录"
        />
        <div class="search-area">
            <el-form ref="form" :model="form" label-width="90px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名">
                            <el-input v-model="form.user_name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="联系电话">
                            <el-input v-model="form.doctor_name" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="就诊号">
                            <el-input v-model="form.code" placeholder="请输入就诊号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="就诊时间段">
                            <el-date-picker
                                    v-model="time_slot"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item>
                            <el-button type="primary" @click="handleSearch">搜索</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
        </div>
        <div class="list-area">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="code"
                        label="就诊号"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="doctor_name"
                        label="医生"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="user_name"
                        label="患者姓名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="price"
                        label="支付金额"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="message"
                        label="未读消息"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="联系电话"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="advice"
                        label="处理意见"
                        width="400">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
                        <el-button @click="handleReturnVisit(scope.row)" type="text" size="small">回访</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                    :handleSizeChange="handleSizeChange"
                    :handleCurrentChange="handleCurrentChange"
                    :currentPage="form.page"
                    :pageSizes="pageSizes"
                    :pageSize="form.page_size"
                    :total="total"
            />
        </div>
    </div>
</template>

<script>
    import Header from "./Header";
    import Pagination from "./Pagination";
    import {getTreatmentList} from "../service/TreatmentService";

    export default {
        name: "TreatmentList",
        components: {
            Header,
            Pagination,
        },
        data(){
            return{
                time_slot:"",
                form:{
                    user_name:'',
                    doctor_name:'',
                    code:'',
                    page: 1,
                    page_size: 20,
                },
                tableData: [],
                pageSizes: [20, 30, 40, 50],
                total:0,
            }
        },
        created(){
            this.handleGetListData()
        },
        methods:{
            handleGetListData(){
                getTreatmentList(this.form)
                    .then(res => {
                        this.tableData = res.tableData;
                        this.total = res.total;
                    })
            },
            handleSizeChange(e) {
                this.form.page_size = e;
                this.form.page = 1;
                this.$nextTick(() => {
                    this.handleGetListData();
                });
            },
            handleCurrentChange(e) {
                this.form.page = e;
                this.$nextTick(() => {
                    this.handleGetListData();
                });
            },
            handleSearch(){
                this.form.page = 1;
                if(this.time_slot){
                    this.form.start = this.time_slot[0];
                    this.form.end = this.time_slot[1];
                }   else {
                    this.form.start = "";
                    this.form.end = "";
                }
                this.$nextTick(() => {
                    this.handleGetListData();
                });
            },

            handleDetail(row){
                this.$router.push({
                    name:"treatmentDetail",
                    query:{id:row.id}
                });
            },
            handleReturnVisit(row){
                console.log(row)
            }
        }
    }
</script>

<style scoped lang="scss" src="../assets/styles/DoctorList.scss">

</style>
