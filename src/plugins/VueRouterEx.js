import Vue from "vue";
import VueRouter from "vue-router";

class VueRouterEx extends VueRouter {
  routes = [];

  constructor(options) {
    super(options);
    const { addRoutes } = this.matcher;
    const { routes } = options;

    this.routes = routes;

    this.matcher.addRoutes = (newRoutes) => {
      this.routes.push(...newRoutes);
      addRoutes(newRoutes);
    };
  }
}

Vue.use(VueRouterEx);

const router = new VueRouterEx({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [],
});

export default router;
