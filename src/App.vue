<template>
    <div :class="['page-main', {'left-margin': showMenu}]">
        <div class="top-bar" v-if="showMenu">
            <span class="web-title">医生工作台</span>
            <span class="log-out" @click="handleLogOut">退出</span>
        </div>
        <el-row class="tac web-menus" v-if="showMenu">
            <el-col>
                <el-menu
                        :default-active="currentPath"
                        class="nav-menu-vertical"
                        @open="handleOpen"
                        @close="handleClose"
                        @select="onMenuSelect"
                        background-color="#545c64"
                        text-color="#fff"
                        :router="routeMode"
                        active-text-color="#ffd04b">
                    <el-menu-item index="/">
                        <i class="el-icon-suitcase"></i>
                        <span slot="title">患者就诊</span>
                    </el-menu-item>
                    <el-menu-item index="/visitlist">
                        <i class="el-icon-camera-solid"></i>
                        <span slot="title">来访用户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/appointment">
                        <i class="el-icon-user-solid"></i>
                        <span slot="title">预约用户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/treatment">
                        <i class="el-icon-s-order"></i>
                        <span slot="title">用户就诊记录</span>
                    </el-menu-item>
                    <el-menu-item index="/medicine">
                        <i class="el-icon-s-shop"></i>
                        <span slot="title">药品列表</span>
                    </el-menu-item>
                    <el-menu-item index="/doctor">
                        <i class="el-icon-s-platform"></i>
                        <span slot="title">医生列表</span>
                    </el-menu-item>
                </el-menu>
            </el-col>
        </el-row>
        <div :class="['app-content', {'app-content-margin': showMenu}]">
            <router-view />
        </div>
    </div>
</template>
<script>
    import EventBus from "./utils/eventbus";
    import xhr from "./utils/xhr";
    export default {
        name: "App",
        data() {
            return {
                routeMode: true,
                currentPath: "/",
                showMenu: false
            }
        },
        created() {
            EventBus.$on("menuchange", (pathObj) => {
                this.currentPath = pathObj.path;
            });
            EventBus.$on("menuStatusChange", (showObj) => {
                this.showMenu = showObj.show;
            });
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            onMenuSelect(index) {
                this.currentPath = index;
            },
            handleLogOut() {
                this.$confirm('确定退出登录吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    xhr({
                        method: "get",
                        url: "clinic/logout"
                    }).then(() => {
                        EventBus.$emit("menuStatusChange", {show: false});
                        this.$router.replace("/login");
                    });
                }).catch(() => {

                });

            }
        }
    };
</script>

<style lang="scss" src="./assets/styles/App.scss"></style>
