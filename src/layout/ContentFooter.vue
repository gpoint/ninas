<template>
  <footer class="footer px-4" style="margin-top: 35%">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }}
          <a
            href="https://caa.cstemp.org"
            class="font-weight-bold ml-1 text-danger"
            target="_blank"
            >Construction Artisans Awards
          </a>
        </div>
      </div>
      <div class="col-lg-6 pr-5">
        <ul
          class="nav nav-footer justify-content-center justify-content-lg-end"
        >
          <li class="nav-item">
            <a
              href="https://caa.cstemp.org/gallery/"
              class="nav-link"
              target="_blank"
              >Gallery</a
            >
          </li>
          <li class="nav-item">
            <a
              href="https://caa.cstemp.org/#contact"
              class="nav-link"
              target="_blank"
              >Contact</a
            >
          </li>
          <li class="nav-item">
            <a
              href="https://cstemp.org/"
              class="nav-link"
              style="color: #77132b !important"
              target="_blank"
            >
              C-STEMP
            </a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
