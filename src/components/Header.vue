<template>
<div class="header-container" :style="getHeaderStyle()">
    <h1 :style="getHeaderTextStyle()">Martina Scafa</h1>
    <div id="nav">
        <router-link v-for="({slug, title},index) in pages" :key="index" :to="slug" :style="getNavigationStyle()">{{title}}</router-link>
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
            isHeaderOverlaid: Boolean

        }
    },

    watch: {
        $route() {
            this.updateHeaderStyle()
        }
    },
    methods: {
        getPages() {
            this.getContentfulEntries({
                content_type: "routes"
            }).then(response => {
                response.items[0].fields.pages.forEach(route => {
                    this.pages.push({
                        slug: `/${route.fields.slug ? route.fields.slug : ""}`,
                        title: route.fields.title,
                        style: {
                            isDarkTheme: route.fields.theme,
                            isHeaderOverlay: route.fields.overlayHeader
                        }
                    })

                })
                this.updateHeaderStyle()
            })
        },

        updateHeaderStyle() {
            const page = this.pages.find(page => page.slug == this.$route.path)
            if (page != null) {
                this.activeColorPrimary = page.style.isDarkTheme ? "#fff" : "#000"
                this.activeColorSecondary = page.style.isDarkTheme ? "#ddd" : "#444"
                this.isHeaderOverlaid = page.style.isHeaderOverlay
            }
        },

        getHeaderStyle() {
            if (this.isHeaderOverlaid == true) {
                return {
                    position: "absolute"
                }
            }
        },

        getHeaderTextStyle() {
            return {
                color: this.activeColorPrimary,
            }
        },

        getNavigationStyle() {
            return {
                color: this.activeColorPrimary,
                //backgroundColor: this.activeColorSecondary
            }
        }
    },

    beforeMount() {
        this.getPages()
    },
};
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Spinnaker&display=swap');

h1 {
    font-size: 31px;
    color: #fff;
    font-weight: normal;
    text-transform: uppercase;
    font-family: 'Spinnaker', sans-serif;
}

#nav {
    display: flex;
    vertical-align: middle;
    align-items: center;
    height: 100%;
}

#nav a {
    font-weight: bold;
    font-size: 19px;
    text-align: center;
    padding: 22px 10px;
    color: #fff;
    margin-left: 8px;
    margin-right: 8px;
}

#nav a.router-link-exact-active {
    color: #ddd;
    background-color: rgba(255, 255, 255, 0.3);
}
</style>
