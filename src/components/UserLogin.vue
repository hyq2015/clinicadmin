<template>
    <div class="login-page">
        <p class="page-title">智慧诊所医生工作台</p>
        <div class="x-login-form">
            <p class="form-title">用户登录</p>
            <el-input
                class="login-input"
                prefix-icon="el-icon-user"
                placeholder="请输入用户名"
                v-model="form.userName"
            />
            <el-input
                class="login-input"
                prefix-icon="el-icon-lock"
                placeholder="请输入密码"
                type="password"
                v-model="form.password"
            />
            <el-button @click="handleLogin" class="login-btn" type="primary">登入系统</el-button>
        </div>
    </div>
</template>

<script>
    import EventBus from "../utils/eventbus";
    import xhr from "../utils/xhr";
    export default {
        name: "UserLogin",
        data() {
            return {
                form: {
                    userName: "",
                    password: "",
                    redirect_uri: "/login"
                }
            }
        },
        created() {
            EventBus.$emit("menuStatusChange", {show: false});
        },
        methods: {
            handleLogin() {
                xhr({
                    method: "post",
                    url: "/clinic/login",
                    data: {
                        account: this.form.userName,
                        password: this.form.password,
                    }
                }).then((res) => {
                    document.cookie = "swtuser=" + res.data.swtuser;
                    sessionStorage.clinic_user = JSON.stringify(res.data);
                    EventBus.$emit("menuStatusChange", {show: true});
                    this.$router.replace("/");
                });
            }
        }
    }
</script>

<style lang="scss">
    .login-page{
        width: 100%;
        height: 100vh;
        background: url("../assets/images/logobg.png") center no-repeat;
        background-size: cover;
        overflow: hidden;
        .page-title{
            margin-top: 30px;
            font-size: 30px;
            font-weight: bold;
            text-align: center;
            color: #fff;
        }
        .form-title{
            color: #10a4ee;
            font-size: 24px;
            line-height: 35px;
            margin-bottom: 32px;
            width: 100%;
            text-align: center;
        }
        .x-login-form{
            margin: 60px auto;
            padding: 20px 20px 40px;
            box-sizing: border-box;
            width: 400px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 5px #a7acaf;
            .login-input {
                margin-bottom: 20px;
                input {
                    background-color: #f4f8f9;
                }
            }
            .login-btn{
                width: 100%;
            }
        }
    }
</style>
