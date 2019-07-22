<template>
    <div class="x-pagination-outer">
        <el-pagination
            background
            class="x-pagination"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="sizes, prev, pager, next"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: {
            handleSizeChange: {
                type: Function
            },
            handleCurrentChange: {
                type:Function
            },
            pageSizes: {
                type: Array,
                default: [20, 50]
            },
            pageSize: {
                type: Number,
                default: 20
            },
            total: {
                type: Number
            }
        },
        data() {
            return {
                currentPage: 1
            }
        }
    }
</script>

<style scoped lang="scss">
    .x-pagination-outer{
        background-color: #fff;
        padding: 20px 0;
        overflow: hidden;
        .x-pagination{
            float: right;
        }
    }
</style>
