import Vue from "vue";
import Router from "vue-router";
import DisplayData from "../views/display/Display.vue";
import EtlRunner from "../views/etl-runner/EtlRunner.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/etl",
            name: "EtlRunner",
            component: EtlRunner
        },
        {
            path: "/",
            name: "DisplayData",
            component: DisplayData
        }
    ]
});
