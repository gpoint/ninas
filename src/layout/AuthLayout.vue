<template>
  <div class="main-content bg-primary">
    <!-- Navbar -->
    <base-nav
      class="navbar-top navbar-horizontal navbar-dark"
      containerClasses="px-4 container"
      expand
    >
      <template v-slot="{ closeMenu }">
        <!-- Collapse header -->
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img src="img/brand/green.png" />
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <button
                type="button"
                @click="closeMenu"
                class="navbar-toggler"
                aria-label="Toggle sidenav"
              >
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
        <!-- Navbar items -->
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link nav-link-icon" href="https://caa.cstemp.org/">
              <i class="fa fa-home"></i>
              <span class="nav-link-inner--text">Home</span>
            </a>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/register">
              <i class="ni ni-circle-08"></i>
              <span class="nav-link-inner--text">Register</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link nav-link-icon" to="/login">
              <i class="ni ni-key-25"></i>
              <span class="nav-link-inner--text">Login</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a
              class="nav-link nav-link-icon"
              href="https://caa.cstemp.org/#contact"
            >
              <i class="ni ni-support-16"></i>
              <span class="nav-link-inner--text">Support</span>
            </a>
          </li>
        </ul>
      </template>
    </base-nav>
    <!-- Header -->
    <div class="header bg-gradient-default py-7 py-lg-8">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-lg-5 col-md-6">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">
                Get in with your details to access your account.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon class="fill-primary" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <div class="container mt--8 pb-5">
      <router-view></router-view>
    </div>
    <footer class="footer px-4">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-lg-6">
          <div class="copyright text-center text-lg-left text-muted">
            © {{ year }}
            <a
              href="https://www.ninas.ng"
              class="font-weight-bold ml-1 text-default"
              target="_blank"
              >Construction Atrisans Awards</a
            >
          </div>
        </div>
        <div class="col-lg-6">
          <ul
            class="nav nav-footer justify-content-center justify-content-lg-end"
          >
            <li class="nav-item">
              <a
                href="https://ninas.ng/about-page/"
                class="nav-link"
                target="_blank"
              >
                About
              </a>
            </li>
            <li class="nav-item">
              <a
                href="https://www.ninas.ng/accreditation/"
                class="nav-link"
                target="_blank"
                >Accreditation</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://ninas.ng/publications/"
                class="nav-link"
                target="_blank"
                >Publications</a
              >
            </li>
            <li class="nav-item">
              <a
                href="https://ninas.ng/contact-page/"
                class="nav-link"
                target="_blank"
                >Contact Us</a
              >
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  name: "auth-layout",
  data() {
    return {
      year: new Date().getFullYear(),
      showMenu: false,
    };
  },
};
</script>
<style></style>
