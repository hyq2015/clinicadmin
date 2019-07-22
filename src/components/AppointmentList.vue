<template>
    <div>
        <Header
            title="预约用户列表"
        />
        <el-form :inline="true" :model="formInline" class="search-form-inline">
            <el-form-item label="姓名">
                <el-input v-model="formInline.user_name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="医生">
                <el-input v-model="formInline.doctor_name" placeholder="姓名"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
                <el-input v-model="formInline.phone" placeholder="联系电话"></el-input>
            </el-form-item>
            <el-form-item label="预约时间段">
                <el-date-picker
                    v-model="searchDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
        </el-form>
        <el-table
                class="x-table"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    fixed
                    prop="doctor_name"
                    label="医生"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="患者姓名"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="image_url"
                    label="患者照片"
                    width="200">
                <template slot-scope="scope">
                    <img class="user-avatar" :src="scope.row.image_url" />
                </template>
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="联系电话"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="description"
                    label="病情描述"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="book_time"
                    label="预约就诊时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination
            :handleSizeChange="handleSizeChange"
            :handleCurrentChange="handleCurrentChange"
            :pageSizes="pageSizes"
            :pageSize="pageSize"
            :total="total"
        />
    </div>
</template>

<script>
    import Header from "./Header";
    import Pagination from "./Pagination";
    import {getAppointmentList} from "../service/AppointmentService";
    export default {
        name: "AppointmentList",
        components: {
            Header,
            Pagination
        },
        data() {
            return{
                tableData: [],
                currentPage: 1,
                pageSizes: [5, 30, 40, 50],
                pageSize: 5,
                total: 0,
                formInline: {
                    user_name: "",
                    doctor_name: "",
                    phone: "",
                    start: "",
                    end: ""
                },
                searchDate: []
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            loadData() {
                getAppointmentList(Object.assign({}, {page: this.currentPage, page_size: this.pageSize}, this.formInline))
                .then(res => {
                    this.tableData = res.tableData;
                    this.total = res.total;
                });
            },
            handleDetail(row) {
                this.$router.push(`/appointment/detail?id=${row.id}&cid=${row.clinic_id}&mid=${row.member_id}&did=${row.doctor_id}`)
            },
            handleCurrentChange(e) {
                this.currentPage = e;
                this.$nextTick(() => {
                    this.loadData();
                });
            },
            handleSizeChange(e) {
                this.pageSize = e;
                this.$nextTick(() => {
                    this.loadData();
                });
            },
            onSearch() {
                const {searchDate, formInline} = this;
                const obj = searchDate && searchDate.length > 0 ? Object.assign({}, formInline, {start: searchDate[0], end: searchDate[1]})
                    : Object.assign({}, formInline, {start: "", end: ""});
                this.formInline = obj;
                this.currentPage = 1;
                this.$nextTick(() => {
                    this.loadData();
                });

            }
        }
    }
</script>

<style scoped lang="scss" src="../assets/styles/AppointmentList.scss"></style>
