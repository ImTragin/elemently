<template>
  <div class="header-container" :style="getHeaderStyle()">
    <div v-if="isMobile()" class="hamburger-button-wrapper">
      <img
        v-if="isDarkMode"
        src="@/assets/menu.svg"
        class="hamburger-menu"
        @click="toggleMobileMenu"
      />
      <img
        v-if="!isDarkMode"
        src="@/assets/menu_dark.svg"
        class="hamburger-menu"
        @click="toggleMobileMenu"
      />
    </div>
    <h1 :style="getHeaderTextStyle()" @click="$router.push('/')">
      Martina Scafa
    </h1>
    <div id="nav" v-if="!isMobile()">
      <div
        v-for="(page, index) in menuItems"
        :key="index"
        :style="cssVars(page.slug)"
      >
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on, attrs }">
            <h2
              class="menu-item"
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
              @click="handleNavigation(item.slug)"
              class="sub-menu-item"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </div>
    <v-overlay :value="isMobileMenuActive" opacity="0.8">
      <div class="overlay-wrapper">
        <h2
          v-for="(page, index) in pages"
          :key="index"
          :style="cssVars(page.slug)"
          class="menu-item-mobile"
          @click="handleNavigation(page.slug)"
        >
          {{ page.title }}
          <h3
            v-for="(item, index) in getItemsForMenuItem(page)"
            :key="index"
            class="sub-menu-item-mobile"
          >
            {{ item.title }}
          </h3>
        </h2>
      </div>
    </v-overlay>
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
      isDarkMode: Boolean,
      isHeaderOverlaid: Boolean,
      isMobileMenuActive: false,
    };
  },

  computed: {
    menuItems(){
      return this.pages.filter(bar => bar.isVisibleAsMenuItem !== false)
    }
  },

  watch: {
    $route() {
      this.updateHeaderStyle();
    },
  },

  methods: {
    toggleMobileMenu() {
      this.isMobileMenuActive = !this.isMobileMenuActive;
    },

    openMobileMenu() {
      this.isMobileMenuActive = true;
    },

    closeMobileMenu() {
      this.isMobileMenuActive = false;
    },

    handleNavigation(route) {
      if (this.$router.currentRoute.fullPath != route) {
        this.$router.push(route);
      }
      if (this.isMobile()) {
        this.closeMobileMenu();
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
                section.sys.contentType != undefined &&
                section.sys.contentType.sys != undefined &&
                section.sys.contentType.sys.id === "pageSection"
              ) {
                section.fields.content.forEach((element) => {
                  let slug = "";
                  slug = `/${element.fields.slug}`;
                  subpages.push({
                    slug: slug,
                    title: element.fields.title,
                    isVisibleAsMenuItem: element.fields.isVisibleInMenu,
                    style: {
                      isDarkTheme: element.fields.theme,
                      isHeaderOverlay: element.fields.overlayHeader,
                    },
                  });
                });
              }
            });
          }
          this.pages.push({
            slug: `/${route.fields.slug ? route.fields.slug : ""}`,
            title: route.fields.title,
            isVisibleAsMenuItem: route.fields.isVisibleInMenu,
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
      let path = this.$route.path;

      let page = undefined;

      for (let index = 0; index < this.pages.length; index++) {
        const element = this.pages[index];
        if (element.slug === path) {
          page = element;
          break;
        } else {
          for (let index = 0; index < element.subItems.length; index++) {
            const item = element.subItems[index];
            if (item.slug === path) {
              page = item;
              break;
            }
          }
        }
      }

      if (page != undefined) {
        this.isDarkMode = page.style.isDarkTheme;
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
        zIndex: 6,
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
  cursor: pointer;
  font-size: 31px;
  letter-spacing: 1.55px;
  color: #fff;
  font-weight: normal;
  text-transform: uppercase;
  font-family: "Spinnaker", sans-serif;
}

.hamburger-menu {
  z-index: 30;
  fill: #fff;
  height: 48px;
  width: 48px;
  margin-right: 32px;
}

#nav {
  margin-left: 64px;
  cursor: pointer;
  display: flex;
  vertical-align: middle;
  align-items: center;
  height: 100%;
}

#nav-mobile {
  margin-left: 64px;

  cursor: pointer;
  display: flex;
  vertical-align: middle;
  align-items: center;
  height: 100%;
}

.overlay-wrapper {
  margin-top: 96px;
  display: flex;
  flex-direction: column;
}

.menu-item {
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

.menu-item-mobile {
  display: var(--displayHome);
  font-family: "Questrial", sans-serif;
  font-size: 32px;
  text-align: left;

  padding: 22px 32px;
  color: #fff;
  user-select: none;
  text-transform: uppercase;
  font-weight: 100;
  text-decoration: none;
}
.sub-menu-item:hover {
  background: #333;
}

.sub-menu-item-mobile {
  padding-left: 12px;
  font-size: 24px;
  font-weight: normal;
}

.hamburger-button-wrapper {
  z-index: 6;
}

::v-deep .v-overlay {
  align-items: flex-start;
  justify-content: start;
}

// ::v-deep .v-overlay__scrim {
//   opacity: 0.86 !important;
// }

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
