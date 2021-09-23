<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      short-title="NINAS"
      title="Nigerian National Accreditation System"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Profile',
            icon: 'ni ni-single-02 text-green',
            path: '/profile',
          }"
        />
        <sidebar-item
          v-if="user.roles.includes('ASSESSOR')"
          :link="{
            name: 'Education',
            icon: 'ni ni-paper-diploma text-green',
            path: '/education',
          }"
        />
        <sidebar-item
          v-if="user.roles.includes('ASSESSOR')"
          :link="{
            name: 'Experience',
            icon: 'ni ni-user-run text-green',
            path: '/experience',
          }"
        />
        <sidebar-item
          v-if="user.roles.includes('ASSESSOR')"
          :link="{
            name: 'Portfolio',
            icon: 'ni ni-vector text-green',
            path: '/portfolio',
          }"
        />
        <sidebar-item
          v-if="user.roles.includes('ADMINISTRATOR')"
          :link="{
            name: 'Assessors',
            icon: 'ni ni-vector text-green',
            path: '/assessors',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Account',
            icon: 'ni ni-badge text-success',
            path: '/account',
          }"
        />
        <!--<sidebar-item
          :link="{
            name: 'Jobs',
            icon: 'ni ni-briefcase-24 text-green',
            path: '/tables',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-green',
            path: '/dashboard',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Icons',
            icon: 'ni ni-planet text-green',
            path: '/icons',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Maps',
            icon: 'ni ni-pin-3 text-green',
            path: '/maps',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Tables',
            icon: 'ni ni-bullet-list-67 text-green',
            path: '/tables',
          }"
        /> -->
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
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem("user")).user;
    },
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
