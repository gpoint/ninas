<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2">
            <small>Sign in with your credentials</small>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @sumbit.prevent="handleLogin()">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model:value="model.email"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model:value="model.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="success" @click="handleLogin" class="my-4">
                Sign in
              </base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    successFn(data) {
      if (data.accessToken != null) {
        window.localStorage.setItem("user", JSON.stringify(data));
        this.$router.push("/profile");
      }
      console.log(data);
      this.loading = false;
    },

    failureFn(error) {
      this.message = error.message;
      console.log(error);
      this.loading = false;
    },
    handleLogin() {
      this.loading = true;
      this.message = "";
      this.submitted = true;

      var obj = {
        model: this.model,
        success: this.successFn,
        failure: this.failureFn,
      };

      if (this.model.email && this.model.password) {
        this.$store.dispatch("auth/login", obj);
      }
    },
  },
};
</script>
<style></style>
