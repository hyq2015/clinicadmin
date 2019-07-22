<template>
    <div class="page-appointment-detail">
        <Header
            title="预约详情"
        />
        <div class="content">
            <p class="part-title">预约信息</p>
            <div class="single-row">
                <div class="single-label">
                    <span class="label-title">姓名：</span>
                    <span class="label-content">{{pageData.userName}}</span>
                </div>
                <div class="single-label">
                    <span class="label-title">性别：</span>
                    <span class="label-content">{{pageData.userGender}}</span>
                </div>
                <div class="single-label">
                    <span class="label-title">年龄：</span>
                    <span class="label-content">{{pageData.userAge}}</span>
                </div>
                <div class="single-label">
                    <span class="label-title">联系电话：</span>
                    <span class="label-content">{{pageData.userPhone}}</span>
                </div>
            </div>
            <div class="single-row">
                <div class="single-label">
                    <span class="label-title">照片：</span>
                    <img class="avatar" :src="pageData.userAvatar" />
                </div>
            </div>
            <div class="single-row">
                <div class="single-label">
                    <span class="label-title">预约诊所：</span>
                    <span class="label-content">{{pageData.clinicName}}</span>
                </div>
            </div>
            <div class="single-row">
                <div class="single-label">
                    <span class="label-title">预约医生：</span>
                    <span class="label-content">{{pageData.doctorName}}</span>
                </div>
            </div>
            <div class="single-row">
                <div class="single-label">
                    <span class="label-title">预约时间：</span>
                    <span class="label-content">{{pageData.appointDate}}</span>
                </div>
            </div>
            <div class="single-row">
                <div class="single-label">
                    <span class="label-title">病情描述：</span>
                    <span class="label-content">{{pageData.desc}}</span>
                </div>
            </div>
            <div class="single-row">
                <el-button type="primary" @click="startDiagnosis">开始诊断</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from "./Header";
    import {getAppointPageDetailInfo} from "../service/AppointmentService";
    export default {
        name: "AppointmentDetail",
        components: {
            Header,
        },
        data() {
            return {
                pageData: {}
            }
        },
        created() {
            const id = this.$router.history.current.query.id;
            const cid = this.$router.history.current.query.cid;
            const mid = this.$router.history.current.query.mid;
            const did = this.$router.history.current.query.did;
            this.loadData(id, cid, mid, did);
        },
        methods: {
            loadData(id, cid, mid, did) {
                getAppointPageDetailInfo(id, cid, mid, did)
                .then(res => {
                    this.pageData = res;
                });
            },
            startDiagnosis(){
                this.$router.push(`/appointment/diagnosis?mid=${this.$router.history.current.query.mid}&sid=${this.$router.history.current.query.id}`)

            },
        }
    }
</script>

<style scoped src="../assets/styles/AppointmentDetail.scss"></style>
