<template>
<nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
    <div class="container-fluid">
        <!--Toggler-->
        <navbar-toggle-button @click="showSidebar">
            <span class="navbar-toggler-icon"></span>
        </navbar-toggle-button>
        <router-link class="navbar-brand" to="/">
            <img :src="logo" class="navbar-brand-img" alt="..." />
        </router-link>

        <slot name="mobile-right">
            <ul class="nav align-items-center"></ul>
        </slot>
        <slot></slot>
        <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">
            <div class="navbar-collapse-header d-md-none">
                <div class="row">
                    <div class="col-6 collapse-brand">
                        <router-link to="/profile" class="text-default">
                            <img :src="user.photoUrl == null ? 'img/theme/user.jpg' : user.photoUrl" class="rounded-circle"/>
                            {{ user.name }}
                        </router-link>
                    </div>
                    <div class="col-6 collapse-close">
                        <navbar-toggle-button @click="closeSidebar"></navbar-toggle-button>
                    </div>
                </div>
            </div>

            <ul class="navbar-nav">
                <slot name="links"> </slot>
            </ul>
            <!--Divider-->
            <hr class="my-3" />
            <!--Heading-->
            <h6 class="navbar-heading text-muted">Support</h6>
            <!--Navigation-->
            <ul class="navbar-nav mb-md-3">
                <li class="nav-item">
                    <a class="nav-link" href="mailto:support@ninas.ng">
                        <i class="ni ni-email-83"></i> Send an Email
                    </a>
                    <a class="nav-link" href="tel:08162952923" title="tel:08107758090">
                        <i class="ni ni-world"></i> Call Support
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</template>

<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";

export default {
    name: "sidebar",
    components: {
        NavbarToggleButton,
    },
    data() {
        return {
            user: {},
        }
    },
    props: {
        logo: {
            type: String,
            default: "img/brand/green.png",
            description: "Sidebar app logo",
        },
        autoClose: {
            type: Boolean,
            default: true,
            description: "Whether sidebar should autoclose on mobile when clicking an item",
        },
    },
    provide() {
        return {
            autoClose: this.autoClose,
        };
    },
    methods: {
        closeSidebar() {
            this.$sidebar.displaySidebar(false);
        },
        showSidebar() {
            this.$sidebar.displaySidebar(true);
        },
    },
    beforeUnmount() {
        if (this.$sidebar.showSidebar) {
            this.$sidebar.showSidebar = false;
        }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user")).user;
    },
};
</script>

<style scoped>
.user-img-overlay{
  opacity: 0;
}
</style>