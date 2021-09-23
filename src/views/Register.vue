<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2">
            <small>Sign up with your credentials</small>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @submit.prevent="handleRegister()">
            <base-input
              formClasses="input-group-alternative"
              placeholder="Firstname"
              addon-left-icon="ni ni-single-02"
              v-model:value="model.firstname"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Lastname"
              addon-left-icon="ni ni-single-02"
              v-model:value="model.lastname"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model:value="model.email"
              focused
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model:value="model.password"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative"
              placeholder="Confirm Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model:value="model.confirmPassword"
            >
            </base-input>

            <div class="text-muted font-italic" v-if="model.password != ''">
              <small
                >Password Strength:
                <span
                  class="font-weight-700"
                  :class="
                    passwordTest.id < 2
                      ? 'text-danger'
                      : passwordTest.id == 2
                      ? 'text-info'
                      : 'text-success'
                  "
                >
                  {{ passwordTest.value }}
                </span></small
              >
            </div>

            <div
              class="text-muted font-italic"
              v-show="
                model.confirmPassword != '' &&
                model.password != model.confirmPassword
              "
            >
              <small>
                <span class="text-danger font-weight-700">
                  Password does not match!
                </span></small
              >
            </div>

            <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted"
                    >I agree with the
                    <a href="#" target="_blank">Privacy Policy</a></span
                  >
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
              <base-button
                v-model:loading="loading"
                @click="handleRegister"
                type="success"
                class="my-4"
                :disabled="loading"
              >
                Create Account</base-button
              >
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <router-link to="/forgot-password" class="text-light">
            <small>Forgot password?</small>
          </router-link>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>Login into your account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { passwordStrength } from "check-password-strength";

export default {
  name: "Register",
  data() {
    return {
      model: {
        password: "",
        confirmPassword: "",
      },
      loading: false,
      submitted: false,
      successful: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    passwordTest() {
      return passwordStrength(this.model.password);
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    testPassword() {
      this.passwordTest = passwordStrength(this.password);
      console.log(passwordStrength(this.password));
    },
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
    handleRegister() {
      this.loading = true;
      this.message = "";
      this.submitted = true;

      var obj = {
        model: this.model,
        success: this.successFn,
        failure: this.failureFn,
      };

      this.$store.dispatch("auth/register", obj);
    },
  },
};
</script>
<style></style>
