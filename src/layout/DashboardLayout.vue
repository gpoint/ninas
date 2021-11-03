<template>
<div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar short-title="CAA" title="Construction Assessors Awards">
        <template v-slot:links>

            <sidebar-item v-if="user.role == 'ADMINISTRATOR'" :link="{
              name: 'Assessors',
              icon: 'ni ni-single-02 text-danger',
              path: '/profile',
            }" />

            <sidebar-item v-if="user.role == 'ASSESSOR'" :link="{
              name: 'Profile',
              icon: 'ni ni-single-02 text-danger',
              path: '/profile',
            }" />

           
            <sidebar-item v-if="user.role == 'ASSESSOR'" :link="{
              name: 'Education',
              icon: 'ni ni-paper-diploma text-default',
              path: '/assessor#education',
            }" />

            <sidebar-item v-if="user.role == 'ASSESSOR'" :link="{
              name: 'Experience',
              icon: 'ni ni-user-run text-danger',
              path: '/assessor#experience',
            }" />

            <sidebar-item v-if="user.role == 'ASSESSOR'" :link="{
              name: 'CAB Experience',
              icon: 'ni ni-compass-04 text-default',
              path: '/assessor#cab-experience',
            }" />

            <sidebar-item v-if="user.role == 'ASSESSOR'" :link="{
              name: 'Standards',
              icon: 'ni ni-like-2 text-danger',
              path: '/assessor#standards',
            }" />

            <sidebar-item :link="{
              name: 'Notifications',
              icon: 'ni ni-bell-55 ' + notificationsTxtColor,
              path: '/notifications',
            }" >
                    <badge class="ml-2" type="danger">1</badge>
            </sidebar-item>

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
    computed: {
      user(){
        return JSON.parse(localStorage.getItem("user")).user
      },

      notificationsTxtColor(){
        return this.user.notifications.length == 0 ? 'text-grey' : 'text-danger'
      }
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
