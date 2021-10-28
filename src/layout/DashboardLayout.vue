<template>
<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar short-title="CAA" title="Construction Assessors Awards">
        <template v-slot:links>

            <sidebar-item :link="{
              name: 'Profile',
              icon: 'ni ni-single-02 text-danger',
              path: '/profile',
            }" />

           
            <sidebar-item :link="{
              name: 'Education',
              icon: 'ni ni-paper-diploma text-default',
              path: '/assessor#education',
            }" />

            <sidebar-item :link="{
              name: 'Experience',
              icon: 'ni ni-user-run text-danger',
              path: '/assessor#experience',
            }" />

            <sidebar-item :link="{
              name: 'CAB Experience',
              icon: 'ni ni-compass-04 text-default',
              path: '/assessor#cab-experience',
            }" />

            <sidebar-item :link="{
              name: 'Referees',
              icon: 'ni ni-like-2 text-danger',
              path: '/assessor#referees',
            }" />

            <sidebar-item :link="{
              name: 'Account',
              icon: 'ni ni-briefcase-24 text-default',
              path: '/account',
            }" />
        </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
        <dashboard-navbar></dashboard-navbar>

        <div @click="toggleSidebar">
            <!-- your content here -->
            <router-view></router-view>
            <content-footer v-if="!$route.meta.hideFooter"></content-footer>
        </div>
    </div>
</div>
</template>

<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
    components: {
        DashboardNavbar,
        ContentFooter,
    },
    data() {
        return {
            sidebarBackground: "red", //vue|blue|orange|green|red|primary
        };
    },
    methods: {
        toggleSidebar() {
            if (this.$sidebar.showSidebar) {
                this.$sidebar.displaySidebar(false);
            }
        },
    },
};
</script>

<style lang="scss"></style>
