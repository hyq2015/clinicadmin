import Router from "vue-router";
import Vue from "vue";
import EventBus from "../utils/eventbus";
Vue.use(Router);

const Page404 = () => import("../components/404"),
    FacesUserList = () => import("../components/FacesUserList"),
    AppointmentList = () => import("../components/AppointmentList"),
    TreatmentList = () => import("../components/TreatmentList"),
    MedicineList = () => import("../components/MedicineList"),
    DoctorList = () => import("../components/DoctorList"),
    UserLogin = () => import("../components/UserLogin"),
    TreatmentDetail = () => import("../components/TreatmentDetail"),
    AppointmentDetail = () => import("../components/AppointmentDetail"),
    MedicalAdvice = () => import("../components/MedicalAdvice"),
    Diagnosis = () => import("../components/Diagnosis"),
    routes = [
        {path: "/", component: MedicalAdvice, meta: {auth: true}},
        {path: "/login", component: UserLogin},
        {path: "/appointment", component: AppointmentList, meta: {auth: true}},
        {path: "/treatment", component: TreatmentList, meta: {auth: true}},
        {path: "/medicine", component: MedicineList, meta: {auth: true}},
        {path: "/doctor", component: DoctorList, meta: {auth: true}},
        {path: "/treatment/detail", name:'treatmentDetail',component: TreatmentDetail, meta: {auth: true}},
        {path: "/appointment/detail", component: AppointmentDetail, meta: {auth: true}},
        {path: "/appointment/diagnosis", component: Diagnosis, meta: {auth: true}},
        {path: "/visitlist", component: FacesUserList, meta: {auth: true}},
        {path: "/404", component: Page404}
    ],
    router = new Router({
        mode: "history",
        routes: routes
    });

function isValidPage(path) {
    return true;
    let flag = false;
    for (let item of routes) {
        if (item.path === path) {
            flag = true;
            break;
        }
    }
    return flag;
}

function isUserLogin() {
    return localStorage.clinic_user || sessionStorage.clinic_user;
}
router.beforeEach((to, from, next) => {
    if (!isValidPage(to.path)) {
        EventBus.$emit("menuStatusChange", {show: false});
        next("/404");
    } else {
        // 验证权限
        if (to.path === "/login") {
            next();
        }else if (isUserLogin()) {
            next();
        }else {
            EventBus.$emit("menuStatusChange", {show: false});
            next("/login");
        }
    }
});
router.afterEach((to) => {
    EventBus.$emit("menuchange", {path: to.path});
    if (to.path !== "/login") {
        EventBus.$emit("menuStatusChange", {show: true});
    }
});
export default router;
