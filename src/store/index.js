import Vue from "vue";
import Vuex from "vuex";
import NotFoundStore from "./modules/NotFoundStore";
import HelloWorldStore from "./modules/HelloWorldStore";
import MainStore from "./modules/MainStore";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
    modules: {
        MainStore,
        NotFoundStore,
        HelloWorldStore
    },
    strict: debug
});
