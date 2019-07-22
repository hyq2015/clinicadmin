<template>
    <div>
        <Header
                title="医生列表"
        />
        <div class="search-area">
            <el-form :inline="true" ref="form" :model="form">
                <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入医生姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearch">搜索</el-button>
                </el-form-item>

            </el-form>
        </div>
        <div class="list-area">
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="name"
                        label="姓名"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="照片"
                        width="200">
                    <template slot-scope="scope">
                        <img class="doctor-avatar" :src="scope.row.image_url" alt="">
                    </template>
                </el-table-column>
                <el-table-column
                        prop="phone"
                        label="手机号"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="rank"
                        label="职称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="score"
                        label="评分"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="description"
                        label="简介"
                        width="400">
                </el-table-column>
                <el-table-column
                        prop="clinic"
                        label="所属诊所"
                        >
                </el-table-column>
            </el-table>
            <Pagination
                    :handleSizeChange="handleSizeChange"
                    :handleCurrentChange="handleCurrentChange"
                    :currentPage="currentPage"
                    :pageSizes="pageSizes"
                    :pageSize="pageSize"
                    :total="total"
            />
        </div>
    </div>
</template>

<script>
    import Header from "./Header";
    import Pagination from "./Pagination";
    import {getDoctorList} from "../service/DoctorService";
    export default {
        name: "DoctorList",
        components: {
            Header,
            Pagination,
        },
        data(){
            return{
                form:{
                    name: "",
                    phone: ""
                },
                tableData: [],
                currentPage: 1,
                pageSizes: [20, 30, 40, 50],
                pageSize: 20,
                total: 0,
                clinicId: 1
            }
        },
        created() {
            this.handleLoadData();
        },
        methods:{
            handleLoadData() {
                getDoctorList(Object.assign({},
                    {page: this.currentPage, page_size: this.pageSize},
                    this.form))
                    .then(res => {
                        this.tableData = res.tableData;
                        this.total = res.total;
                    })
            },
            handleSizeChange(e) {
                this.pageSize = e;
                this.currentPage = 1;
                this.$nextTick(() => {
                    this.handleLoadData();
                });
            },
            handleCurrentChange(e) {
                this.currentPage = e;
                this.$nextTick(() => {
                    this.handleLoadData();
                });
            },
            handleSearch(){
                this.currentPage = 1;
                this.$nextTick(() => {
                    this.handleLoadData();
                });
            }
        }
    }
</script>

<style scoped lang="scss" src="../assets/styles/DoctorList.scss">

</style>
