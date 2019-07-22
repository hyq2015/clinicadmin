<template>
    <el-dialog
            title="选择来访用户"
            :visible.sync="visitListVisible"
            width="60%"
            :close-on-click-modal="false"
            :show-close="false"
            :close-on-press-escape="false"
    >
        <div>
            <div>
                <el-table
                        height="360px"
                        class="x-table"
                        highlight-current-row
                        @current-change="setCurrentData"
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
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleDialogVisible(false)">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import Pagination from "./Pagination";
    import {getList} from "../service/FaceUserListService";
    export default {
        name: "VisitUserListDialog",
        components: {
            Pagination
        },
        props: {
            visitListVisible: {
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
                searchDate: [],
                currentRow:null,
            }
        },
        methods: {
            handleDialogVisible(bool) {
                this.$emit("handleVisitListDialogVisible", bool);
            },
            loadData() {
                getList({page: this.currentPage, page_size: this.pageSize})
                    .then(res => {
                        this.tableData = res.data;
                        this.total = res.total;
                    });
            },
            handleSelected() {
                if(this.currentRow){
                    this.$emit("selectUser",this.currentRow);
                }   else {
                    this.$message.error("请选择用户!")
                }

            },


            handleRegister(row) {
                this.$emit("handleVisitListDialogVisible", false);
                this.$emit("handleRegister",row);
            },

            handleDiagnose(row) {
                this.$emit("handleVisitListDialogVisible", false);
                this.$emit("handleDiagnose",row);
            },


            setCurrentData(val){
                this.currentRow = val;
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
        }
    }
</script>

<style scoped>

</style>
