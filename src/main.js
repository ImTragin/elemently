import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";
import Vuetify from "vuetify/lib";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import contentfulMixins from "./mixins/contentfulMixins";
import router from "./router";
const contenful = require("contentful");
import Page from "./components/Page.vue";
const client = contenful.createClient({
  space: "r1wfevxudzi5",
  accessToken: "Mgp0hGKiO1LeLM3Z0uAlSeu-nVKR4aQpsno_-vNCKwc",
});

// Importing the global css file
import "@/assets/global.scss";

Vue.mixin(contentfulMixins);
Vue.use(VueRouter);
Vue.config.productionTip = false;
Vue.use(Vuetify);

import {
  faTwitterSquare,
  faInstagramSquare,
  faDeviantart,
} from "@fortawesome/free-brands-svg-icons";

import vuetify from "./plugins/vuetify";

library.add([faTwitterSquare, faInstagramSquare, faDeviantart]);
Vue.component("font-awesome-icon", FontAwesomeIcon);
console.log("Setting up new Vue");

new Vue({
  router,
  store,
  render: (h) => h(App),

  methods: {
    getDynamicRoutes() {
      client
        .getEntries({
          content_type: "page",
        })
        .then((response) => {
          response.items.forEach((route) => {
            this.$router.addRoute({
              name: route.fields.title,
              path: `/${route.fields.slug ? route.fields.slug : ""}`,
              component: Page,
              props: { PageId: route.sys.id },
            });
          });
        });
    },
  },

  vuetify,

  created() {
    this.getDynamicRoutes();
  },
}).$mount("#app");
