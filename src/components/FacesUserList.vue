<template>
    <div class="page-face-user">
        <Header
            title="来访用户列表"
        />
        <RegisterDialog
            :dialogTableVisible="dialogTableVisible"
            @handleDialogVisible="handleDialogVisible"
            @confirmAdd="addUser"
        />
        <el-table
                class="x-table"
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="照片"
                    width="200">
                <template slot-scope="scope">
                    <img style="width: 80px;height: 80px" class="user-avatar" :src="scope.row.avatar" />
                </template>
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="预约时间"
                    width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.visit_time}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="是否注册"
                    width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.member_id ? '已注册' : '未注册'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.member_id" @click="handleDiagnose(scope.row)" type="text" size="small">诊断</el-button>
                    <el-button v-else @click="handleRegister(scope.row)" type="text" size="small">注册</el-button>
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
    import RegisterDialog from "./RegisterDialog";
    import timeUtil from "@rickyhuang/timeutil/src/index";
    import {getList,addMember} from "../service/FaceUserListService";
    export default {
        name: "FacesUserList",
        components: {
            Header,
            Pagination,
            RegisterDialog
        },
        data() {
            return{
                tableData: [],
                currentPage: 1,
                pageSizes: [10, 20, 40, 50],
                pageSize: 10,
                total: 0,
                dialogTableVisible: false,
                rowData:null,
            }
        },
        created() {
            this.loadData();
        },
        methods: {
            handleRegister(row) {
                this.handleDialogVisible(true);
                this.rowData = row;
            },
            addUser(data){
                data.face_id = this.rowData.face_id;
                addMember(data)
                    .then(() => {
                        this.handleDialogVisible(false);
                        this.currentPage = 1;
                        this.loadData();
                    })

            },
            handleDiagnose(row) {
                this.$router.push(`/appointment/diagnosis?mid=${row.member_id}`)
            },

            loadData() {
                getList({page: this.currentPage, page_size: this.pageSize})
                    .then(res => {
                        res.data.map(item => {
                            item.visit_time = timeUtil(item.visit_time, "yyyy-MM-dd hh:mm:ss");
                        });
                        this.tableData = res.data;
                        this.total = res.total;
                    })
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
            handleDialogVisible(bool) {
                this.dialogTableVisible = bool;
            }
        }
    }
</script>

<style scoped lang="scss" scoped src="../assets/styles/FaceUserList.scss"></style>
