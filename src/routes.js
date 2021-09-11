const contenful = require("contentful");
import Page from "./components/Page.vue";
const client = contenful.createClient({
  space: "r1wfevxudzi5",
  accessToken: "Mgp0hGKiO1LeLM3Z0uAlSeu-nVKR4aQpsno_-vNCKwc",
});

let appRoutes = {
  routes: [],

  async getRoutes() {
    client
      .getEntries({
        content_type: "page",
      })
      .then((response) => {
        console.log(response);

        response.items.forEach((route) => {
          console.log(route);
          this.routes.push({
            name: route.fields.title,
            path: `/${route.fields.slug ? route.fields.slug : ""}`,
            component: Page,
            props: { PageId: route.sys.id },
          });
        });

        //   .fields.routes.map((route) => {
        //         const newRoute = {
        //           name: route.fields.title,
        //            path: `/${route.fields.slug ? route.fields.slug : ""}`,
        //            component: Page,
        //            props: { PageId: route.sys.id },
        //         };
        //          return newRoute;
        // })
      });
  },
};

export default appRoutes;
