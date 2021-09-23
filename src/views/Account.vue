<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-md-6 d-flex align-items-center"
      style="
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center mt-5">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <p class="text-white mt-0 mb-3">
              <!-- This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks -->
            </p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-7 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My Account</h3>
                  </div>
                  <div class="col-4 text-right">
                    <a
                      href="/profile"
                      @click.prevent="saveProfile"
                      class="btn btn-sm btn-default"
                      >Save</a
                    >
                  </div>
                </div>
              </div>
            </template>

            <form>
              <h6 class="heading-small text-muted mb-4">User Information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="First name"
                      placeholder="First name"
                      input-classes="form-control-alternative"
                      v-model:value="model.firstName"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Last name"
                      placeholder="Last name"
                      input-classes="form-control-alternative"
                      v-model:value="model.lastName"
                    />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">Contact Information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      alternative=""
                      label="Email Address"
                      placeholder="Email Address"
                      input-classes="form-control-alternative"
                      v-model:value="model.email"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <base-input
                      alternative=""
                      label="Phone Number"
                      placeholder="Phone Number"
                      input-classes="form-control-alternative"
                      v-model:value="model.phone"
                    />
                  </div>
                </div>
              </div>
            </form>
          </card>
        </div>
        <div class="col-xl-5 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Update Password</h3>
                  </div>
                  <div class="col-4 text-right">
                    <a
                      href="/profile"
                      @click.prevent="showPasswordConfirmationModal = true"
                      class="btn btn-sm btn-danger"
                      >Save</a
                    >
                  </div>
                </div>
              </div>
            </template>
            <form>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-12">
                    <base-input
                      alternative=""
                      label="Current Password"
                      type="password"
                      placeholder="Enter your current password"
                      input-classes="form-control-alternative"
                      v-model:value="passwordModel.password"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      type="password"
                      label="New Password"
                      placeholder="Enter New Password"
                      input-classes="form-control-alternative"
                      v-model:value="passwordModel.newPassword"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      type="password"
                      label="Confirm Password"
                      placeholder="Confirm Password"
                      input-classes="form-control-alternative"
                      v-model:value="passwordModel.confirmPassword"
                    />
                  </div>
                  <div
                    class="col-12 text-muted font-italic mb--2"
                    v-if="passwordModel.newPassword != ''"
                  >
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
                      </span>
                    </small>
                  </div>

                  <div
                    class="col-12 text-muted font-italic mt--3"
                    v-show="
                      passwordModel.confirmPassword != '' &&
                      passwordModel.newPassword != passwordModel.confirmPassword
                    "
                  >
                    <br />
                    <small>
                      <span class="text-danger font-weight-700">
                        Password does not match!
                      </span></small
                    >
                  </div>
                </div>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { passwordStrength } from "check-password-strength";
import UserService from "../api/services/user.service";

export default {
  name: "user-profile",
  data() {
    return {
      model: {},
      contactModel: {},
      passwordModel: {
        password: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  computed: {
    passwordTest() {
      return passwordStrength(this.passwordModel.newPassword);
    },
  },
  methods: {
    saveProfile() {
      UserService.saveProfile(this.model);
    },
  },
  mounted() {
    UserService.getProfile().then((response) => {
      this.model = response.data.result;
    });
  },
};
</script>
<style></style>
