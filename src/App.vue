<template>
  <div id="app"><!-- 
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->


    <div id="preloder" v-if="loading">
      <div class="loader"></div>
    </div>
    
    <!-- Header section -->
    <header class="header-section">
      <div class="header-top">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 header-top-left">
              <div class="top-info">
                <i class="fa fa-phone"></i>
                (+88) 666 121 4321
              </div>
              <div class="top-info">
                <i class="fa fa-envelope"></i>
                info.leramiz@colorlib.com
              </div>
            </div>
            <div class="col-lg-6 text-lg-right header-top-right">
              <div class="top-social">
                <a href=""><i class="fa fa-facebook"></i></a>
                <a href=""><i class="fa fa-twitter"></i></a>
                <a href=""><i class="fa fa-instagram"></i></a>
                <a href=""><i class="fa fa-pinterest"></i></a>
                <a href=""><i class="fa fa-linkedin"></i></a>
              </div>
              <div class="user-panel" v-if="loggedin">
                <router-link to="/"><i class="fa fa-user"></i> Username</router-link>
              </div>
              <div class="user-panel" v-if="!loggedin">
                <router-link to="/register"><i class="fa fa-user-circle-o"></i> Register</router-link>
                <router-link to="/login"><i class="fa fa-sign-in"></i> Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="site-navbar">
              <a href="#" class="site-logo"><img :src="require('@/assets/img/logo.png')" alt=""></a>
              <div class="nav-switch">
                <i class="fa fa-bars"></i>
              </div>
              <ul class="main-menu hidden-xs">
                <li><a href="index.html">Home</a></li>
                <li><a href="categories.html">FEATURED LISTING</a></li>
                <li><a href="about.html">ABOUT US</a></li>
                <li><a href="single-list.html">Pages</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
              <ul class="main-menu hidden-sm hidden-md hidden-lg" id="main-menu">
                <li><a href="index.html">Home</a></li>
                <li><a href="categories.html">FEATURED LISTING</a></li>
                <li><a href="about.html">ABOUT US</a></li>
                <li><a href="single-list.html">Pages</a></li>
                <li><a href="blog.html">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <!-- Header section end -->

    <router-view/>

    <!-- Footer section -->
  <footer class="footer-section set-bg" :style="`background: url('${require('@/assets/img/footer-bg.jpg')}')`">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-6 footer-widget">
          <img src="@/assets/img/logo.png" alt="">
          <p>Lorem ipsum dolo sit azmet, consecter dipise consult  elit. Maecenas mamus antesme non anean a dolor sample tempor nuncest erat.</p>
          <div class="social">
            <a href="#"><i class="fa fa-facebook"></i></a>
            <a href="#"><i class="fa fa-twitter"></i></a>
            <a href="#"><i class="fa fa-instagram"></i></a>
            <a href="#"><i class="fa fa-pinterest"></i></a>
            <a href="#"><i class="fa fa-linkedin"></i></a>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 footer-widget">
          <div class="contact-widget">
            <h5 class="fw-title">CONTACT US</h5>
            <p><i class="fa fa-map-marker"></i>3711-2880 Nulla St, Mankato, Mississippi </p>
            <p><i class="fa fa-phone"></i>(+88) 666 121 4321</p>
            <p><i class="fa fa-envelope"></i>info.leramiz@colorlib.com</p>
            <p><i class="fa fa-clock-o"></i>Mon - Sat, 08 AM - 06 PM</p>
          </div>
        </div>
        <div class="col-lg-3 col-md-6 footer-widget">
          <div class="double-menu-widget">
            <h5 class="fw-title">POPULAR PLACES</h5>
            <ul>
              <li><a href="">Florida</a></li>
              <li><a href="">New York</a></li>
              <li><a href="">Washington</a></li>
              <li><a href="">Los Angeles</a></li>
              <li><a href="">Chicago</a></li>
            </ul>
            <ul>
              <li><a href="">St Louis</a></li>
              <li><a href="">Jacksonville</a></li>
              <li><a href="">San Jose</a></li>
              <li><a href="">San Diego</a></li>
              <li><a href="">Houston</a></li>
            </ul>
          </div>
        </div>
        <div class="col-lg-3 col-md-6  footer-widget">
          <div class="newslatter-widget">
            <h5 class="fw-title">NEWSLETTER</h5>
            <p>Subscribe your email to get the latest news and new offer also discount</p>
            <form class="footer-newslatter-form">
              <input type="text" placeholder="Email address">
              <button><i class="fa fa-send"></i></button>
            </form>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="footer-nav">
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">Featured Listing</a></li>
            <li><a href="">About us</a></li>
            <li><a href="">Pages</a></li>
            <li><a href="">Blog</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </div>
        <div class="copyright">
          <p><!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
Copyright &copy; {{date}} All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank">Colorlib</a>
<!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --></p>
        </div>
      </div>
    </div>
  </footer>
  </div>
</template>

<style>
/*
media all{
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
}*/
</style>
<script >
  export default {
    data() {
      return {
        loading: true
      }
    },
    computed: {
      date() {
        return new Date().getFullYear();
      },
      loggedin() {
        return true;
        // return this.$store.state.loggedin;
      }
    },
    mounted() {
      var t = this;
      setTimeout(function() {
        t.loading = false;
      }, 1000);
    }
  };
</script>
