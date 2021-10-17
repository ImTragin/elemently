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
import * as contentful from "contentful";
import Page from "./components/Page.vue";
import VueMeta from "vue-meta";

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
Vue.use(VueMeta);

import {
  faTwitterSquare,
  faInstagramSquare,
  faDeviantart,
} from "@fortawesome/free-brands-svg-icons";

import vuetify from "./plugins/vuetify";

library.add([faTwitterSquare, faInstagramSquare, faDeviantart]);
Vue.component("font-awesome-icon", FontAwesomeIcon);
console.log("Setting up new Vue");

router.afterEach((to, from) => {
  Vue.nextTick(() => {
    document.title = `${to.name} - Martina Scafa` || "Martina Scafa";
  });
});

new Vue({
  router,
  store,
  render: (h) => h(App),

  methods: {
    //TODO make this recursive and cleanup the code..

    getDynamicRoutes() {
      client
        .getEntries({
          content_type: "page",
        })
        .then((response) => {
          var responseRoutes = response.items;

          const routes = [];

          const pagesWithSubRoutes = [];

          response.items.forEach((route) => {
            if (route.fields.pageSections != null) {
              route.fields.pageSections.forEach((section) => {
                if (section.sys.contentType != null) {
                  if (section.sys.contentType.sys.id === "pageSection") {
                    section.fields.content.forEach((page) => {
                      routes.push({
                        name: page.fields.title,
                        path: `/${route.fields.slug ? route.fields.slug : ""}/${
                          page.fields.slug
                        }`,
                        component: Page,
                        props: { PageId: page.sys.id },
                      });

                      responseRoutes.splice(responseRoutes.indexOf(page), 1);
                    });
                  }
                }
              });
            }
          });

          response.items.forEach((route) => {
            routes.push({
              name: route.fields.title,
              path: `/${route.fields.slug ? route.fields.slug : ""}`,
              component: Page,
              props: { PageId: route.sys.id },
            });
          });

          routes.forEach((route) => {
            this.$router.addRoute(route);
          });
        });
    },
  },

  vuetify,

  created() {
    this.getDynamicRoutes();
  },
}).$mount("#app");
