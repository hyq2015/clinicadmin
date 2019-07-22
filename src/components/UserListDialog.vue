<template>
    <el-dialog
            title="选择预约用户"
            :visible.sync="userListVisible"
            width="60%"
            :close-on-click-modal="false"
            :show-close="false"
            :close-on-press-escape="false"
            >
        <div>
            <div>
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
                        height="360px"
                        class="x-table"
                        highlight-current-row
                        :data="tableData"
                        style="width: 100%">
                    <el-table-column
                            label="照片"
                            width="200">
                        <template slot-scope="scope">
                            <img style="width: 80px;height: 80px" class="user-avatar" :src="scope.row.image_url" />
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="患者姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="phone"
                            label="联系电话"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="book_time"
                            label="预约就诊时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="description"
                            label="病情描述"
                            >
                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                    >
                        <template slot-scope="scope">
                            <el-button @click="handleSelected(scope.row)" type="text" size="small">诊断</el-button>
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
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleDialogVisible(false)">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import Pagination from "./Pagination";
    import {getAppointmentList} from "../service/AppointmentService";
    export default {
        name: "UserListDialog",
        components: {
            Pagination
        },
        props: {
            userListVisible: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.loadData();
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
                searchDate: [],
            }
        },
        methods: {
            handleDialogVisible(bool) {
                this.$emit("handleUserListDialogVisible", bool);
            },
            loadData() {
                getAppointmentList(Object.assign({}, {page: this.currentPage, page_size: this.pageSize}, this.formInline))
                    .then(res => {
                        this.tableData = res.tableData;
                        this.total = res.total;
                    });
            },
            handleSelected(row) {
                this.$emit("selectUser",row);
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

<style scoped>

</style>