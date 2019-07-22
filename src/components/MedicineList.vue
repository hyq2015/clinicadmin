<template>
    <div>
        <Header
                title="药品列表"
        />
        <div class="search-area">
            <el-form ref="form" :model="form" label-width="80px">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="药品名称">
                            <el-input v-model="form.title" placeholder="请输入药品名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="药品编码">
                            <el-input v-model="form.code" placeholder="请输入药品编码"></el-input>
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
                        label="药品编码"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="名称"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="specification"
                        label="规格"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="sale_price"
                        label="价格"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="dosage"
                        label="一次用量"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="usage"
                        label="用法"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="frequency"
                        label="频率">
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
    import {getMedicineList} from "../service/MedicineService";

    export default {
        name: "MedicineList",
        components: {
            Header,
            Pagination,
        },
        data(){
            return{
                form:{
                    title:'',
                    code:'',
                    page: 1,
                    page_size: 20,
                },
                pageSizes: [20, 30, 40, 50],
                tableData: [],
                total: 0,
            }
        },
        created(){
            this.handleMedicineList();
        },
        methods:{
            handleMedicineList(){
                getMedicineList(this.form)
                    .then(res => {
                    this.tableData = res.tableData;
                    this.total = res.total;
                })
            },
            handleSizeChange(e) {
                this.form.page_size = e;
                this.form.page = 1;
                this.$nextTick(() => {
                    this.handleMedicineList();
                });
            },
            handleCurrentChange(e) {
                this.form.page = e;
                this.$nextTick(() => {
                    this.handleMedicineList();
                });
            },
            handleSearch(){
                this.form.page = 1;
                this.$nextTick(() => {
                    this.handleMedicineList();
                });
            },
        }
    }
</script>

<style scoped lang="scss" src="../assets/styles/DoctorList.scss">

</style>
