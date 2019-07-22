import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router";
import store from "./store";
import App from "./App";
Vue.use(ElementUI);
new Vue({
    router: router,
    el: "#app",
    store,
    components: {App},
    template: "<App/>"
});
