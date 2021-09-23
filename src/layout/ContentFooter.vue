<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          © {{ year }}
          <a
            href="https://www.ninas.ng"
            class="font-weight-bold ml-1 text-success"
            target="_blank"
            >Nigerian National Accreditation System</a
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
