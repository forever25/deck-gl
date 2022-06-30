import Vue from "vue";
import App from "./App.vue";
import PictureView from "@/plugin/picture-view/index.js";

Vue.config.productionTip = false;

Vue.use(PictureView);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
