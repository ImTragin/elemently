<template>
  <div class="header-container" :style="getHeaderStyle()">
    <h1 :style="getHeaderTextStyle()" @click="$router.push('/')">
      Martina Scafa
    </h1>
    <div
      id="nav"
      v-for="(page, index) in pages"
      :key="index"
      :style="cssVars(page.slug)"
    >
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ on, attrs }">
          <h2
            class="header-item"
            v-bind="attrs"
            v-on="on"
            @click="handleNavigation(page.slug)"
          >
            {{ page.title }}
          </h2>
        </template>

        <v-list v-if="getItemsForMenuItem(page).length > 0" dark>
          <v-list-item
            v-for="(item, index) in getItemsForMenuItem(page)"
            :key="index"
            @click="handleNavigation(page.slug + '/' + item.fields.slug)"
            class="sub-menu-item"
          >
            <v-list-item-title>{{ item.fields.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pages: [],
      activeColorPrimary: String,
      activeColorSecondary: String,
      activeColorText: String,
      isHeaderOverlaid: Boolean,
    };
  },

  computed: {},

  watch: {
    $route() {
      this.updateHeaderStyle();
    },
  },
  methods: {
    handleNavigation(route) {
      if (this.$router.currentRoute.fullPath != route) {
        this.$router.push(route);
      }
    },

    getItemsForMenuItem(page) {
      var foo = this.pages.find((ele) => ele.title == page.title);
      return foo.subItems;
    },

    cssVars(slug) {
      return {
        "--textColor": this.activeColorPrimary,
        "--bg-color": this.activeColorSecondary,
        "--button-text-color": this.activeColorText,
        "--displayHome": this.shouldShow(slug),
      };
    },

    shouldShow(slug) {
      if (slug === "/") {
        return "none";
      } else {
        return "initial";
      }
    },

    getPages() {
      this.getContentfulEntries({
        content_type: "routes",
        include: "3",
      }).then((response) => {
        response.items[0].fields.pages.forEach((route) => {
          var subpages = [];

          if (route.fields.pageSections != undefined) {
            route.fields.pageSections.forEach((section) => {
              if (
                section.sys != undefined &&
                section.sys.contenType != undefined &&
                section.sys.contentType.sys != undefined &&
                section.sys.contentType.sys.id === "pageSection"
              ) {
                subpages = section.fields.content;
              }
            });
          }

          this.pages.push({
            slug: `/${route.fields.slug ? route.fields.slug : ""}`,
            title: route.fields.title,
            style: {
              isDarkTheme: route.fields.theme,
              isHeaderOverlay: route.fields.overlayHeader,
            },
            subItems: subpages,
          });
        });
        this.updateHeaderStyle();
      });
    },

    updateHeaderStyle() {
      const page = this.pages.find((page) => page.slug === this.$route.path);
      if (page != null) {
        this.activeColorPrimary = page.style.isDarkTheme ? "#fff" : "#000";
        this.activeColorSecondary = page.style.isDarkTheme ? "#fff" : "#444";
        this.activeColorText = page.style.isDarkTheme ? "#444" : "#fff";
        this.isHeaderOverlaid = page.style.isHeaderOverlay;
      }
    },

    getHeaderStyle() {
      if (this.isHeaderOverlaid === true) {
        return {
          position: "absolute",
        };
      }
      return {
        marginBottom: "32px",
        boxShadow: "0px 1px 5px #222222",
      };
    },

    getHeaderTextStyle() {
      return {
        color: this.activeColorPrimary,
      };
    },
  },

  beforeMount() {
    this.getPages();
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Spinnaker&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Questrial&display=swap");

h1 {
  user-select: none;
  margin-right: 64px;
  cursor: pointer;
  font-size: 31px;
  letter-spacing: 1.55px;
  color: #fff;
  font-weight: normal;
  text-transform: uppercase;
  font-family: "Spinnaker", sans-serif;
}

#nav {
  cursor: pointer;
  display: flex;
  vertical-align: middle;
  align-items: center;
  height: 100%;
}

.header-item {
  display: var(--displayHome);
  font-family: "Questrial", sans-serif;
  font-size: 19px;
  text-align: center;
  padding: 22px 10px;
  color: var(--textColor);
  user-select: none;

  text-transform: uppercase;
  font-weight: 100;
  text-decoration: none;
}

.sub-menu-item {
}

.sub-menu-item:hover {
  background: #333;
}

.header-item:hover {
  color: var(--button-text-color);
  -o-transition: 0.5s;
  -ms-transition: 0.5s;
  -moz-transition: 0.5s;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  background-color: var(--bg-color);
}

#nav a.router-link-exact-active {
  color: var(--button-text-color);
  background-color: var(--bg-color);
}
</style>
