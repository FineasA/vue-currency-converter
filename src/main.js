import Vue from "vue";
import App from "./App.vue";
import CountryFlag from "vue-country-flag";
import { BootstrapVue, IconsPlugin, AvatarPlugin } from "bootstrap-vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faAdjust,
  faBalanceScale,
  faExchangeAlt,
  faChevronRight,
  faDollarSign,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeLayers,
  FontAwesomeLayersText,
} from "@fortawesome/vue-fontawesome";

import axios from "axios";

Vue.prototype.$http = axios;

Vue.component("font-awesome-layers", FontAwesomeLayers);
Vue.component("font-awesome-layers-text", FontAwesomeLayersText);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("country-flag", CountryFlag);

library.add(
  faUserSecret,
  faAdjust,
  faBalanceScale,
  faExchangeAlt,
  faChevronRight,
  faDollarSign,
  faArrowRight
);

Vue.config.productionTip = false;

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(AvatarPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export const EventBus = new Vue();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
