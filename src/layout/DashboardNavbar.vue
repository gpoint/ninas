<template>
<base-nav class="navbar-top navbar-dark" id="navbar-main" :show-toggle-button="false" expand>
    <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-sm-flex ml-sm-auto">
        <div class="form-group mb-0">
        </div>
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
        <li class="nav-item dropdown">
            <base-dropdown class="nav-link pr-4">
                <template v-slot:title>
                    <div class="media align-items-center">
                        <span class="avatar avatar-sm rounded-circle">
                            <img alt="User" :src="user.photoUrl == null ? 'img/theme/user.jpg' : user.photoUrl" style="object-fit:cover; max-height:70px" />
                        </span>
                        <div class="media-body ml-2 d-none d-lg-block">
                            <span class="mb-0 text-sm font-weight-bold">
                                {{ user.name }}
                            </span>
                        </div>
                    </div>
                </template>
                <router-link to="/profile" class="dropdown-item">
                    <i class="ni ni-single-02 text-success"></i>
                    <span>My Profile</span>
                </router-link>
                <router-link to="/notifications" class="dropdown-item">
                    <i class="ni ni-bell-55 text-danger"></i>
                    <span>Notifications</span>
                    <badge class="ml-2" type="danger">1</badge>
                    <badge class="ml-1" type="success">3</badge>
                </router-link>
                <router-link to="/account" class="dropdown-item">
                    <i class="ni ni-settings-gear-65 text-gray"></i>
                    <span>Account</span>
                </router-link>
                <router-link to="/support" class="dropdown-item">
                    <i class="ni ni-support-16 text-success"></i>
                    <span>Support</span>
                </router-link>
                <div class="dropdown-divider"></div>
                <a @click="logout" class="dropdown-item">
                    <i class="ni ni-button-power text-danger"></i>
                    <b>
                        <span>Logout</span>
                    </b>
                </a>
            </base-dropdown>
        </li>
    </ul>
</base-nav>
</template>

<script>
export default {
    data() {
        return {
            user: {},
            activeNotifications: false,
            showMenu: false,
            searchQuery: "",
        };
    },
    methods: {
        logout() {
            this.$store.dispatch("auth/logout");
            this.$router.push("/login");
        },
        toggleSidebar() {
            this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
        },
        hideSidebar() {
            this.$sidebar.displaySidebar(false);
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user")).user;

    },
};
</script>
