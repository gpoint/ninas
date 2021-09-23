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
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      src="img/theme/team-4-800x800.jpg"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <base-button size="sm" type="info" class="mr-4"
                  >Change Picture</base-button
                >
                <router-link
                  to="/account"
                  class="btn btn-sm btn-default float-right"
                >
                  Update Contact
                </router-link>
              </div>
            </div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  ></div>
                </div>
              </div>
              <div class="text-center">
                <h3>
                  {{ model.name }}
                </h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>
                  <strong> {{ model.city }} </strong>,
                  {{ model.stateOfResidence }}
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i
                  >{{ model.email }} - {{ model.phone }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My Profile</h3>
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
              <h6 class="heading-small text-muted mb-4">User information</h6>
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
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label">Gender</label>
                      <select
                        class="form-control-alternative form-control"
                        v-model="model.gender"
                        style="width: 100%"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      type="date"
                      label="Date Of Birth"
                      placeholder="Date Of Birth"
                      input-classes="form-control-alternative"
                      v-model:value="model.dateOfBirth"
                    />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">
                Residence Information
              </h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      alternative=""
                      label="Address"
                      placeholder="Home Address"
                      input-classes="form-control-alternative"
                      v-model:value="model.address"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <base-input
                      alternative=""
                      label="City"
                      placeholder="City"
                      input-classes="form-control-alternative"
                      v-model:value="model.city"
                    />
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label">
                        State Of Residence
                      </label>
                      <select
                        class="form-control-alternative form-control"
                        v-model="model.stateOfResidence"
                        style="width: 100%"
                      >
                        <option
                          v-for="state in states"
                          :key="state"
                          :value="state"
                        >
                          {{ state }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="form-group">
                      <label class="form-control-label">State Of Origin</label>
                      <select
                        class="form-control-alternative form-control"
                        v-model="model.stateOfOrigin"
                        style="width: 100%"
                      >
                        <option
                          v-for="state in states"
                          :key="state"
                          :value="state"
                        >
                          {{ state }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Description -->
              <h6 class="heading-small text-muted mb-4">
                Basic Assessor Details
              </h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-12">
                    <div class="form-group">
                      <base-input alternative="" label="About Me">
                        <textarea
                          rows="4"
                          v-model="model.description"
                          class="form-control form-control-alternative"
                          placeholder="A few words about why you should receive the award ..."
                        ></textarea>
                      </base-input>
                    </div>
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
import UserService from "../api/services/user.service";

export default {
  name: "user-profile",
  data() {
    return {
      model: {},
      trades: [
        "Carpenter",
        "Electrician",
        "Iron Bender",
        "Mason",
        "Painter",
        "Plumber",
        "Tiler",
        "Welder",
      ],
      states: [
        "ABUJA",
        "ABIA",
        "ADAMAWA",
        "AKWA",
        "ANAMBRA",
        "BAUCHI",
        "BAYELSA",
        "BENUE",
        "BORNO",
        "CROSS",
        "DELTA",
        "EBONYI",
        "EDO",
        "EKITI",
        "ENUGU",
        "GOMBE",
        "IMO",
        "JIGAWA",
        "KADUNA",
        "KANO",
        "KATSINA",
        "KEBBI",
        "KOGI",
        "KWARA",
        "LAGOS",
        "NASSARAWA",
        "NIGER",
        "OGUN",
        "ONDO",
        "OSUN",
        "OYO",
        "PLATEAU",
        "RIVERS",
        "SOKOTO",
        "TARABA",
        "YOBE",
        "ZAMFARA",
      ],
    };
  },
  methods: {
    saveProfile() {
      UserService.saveProfile(this.model);
    },
  },
  mounted() {
    UserService.getProfile().then((response) => {
      this.model = response.data.result;
      this.model.status = null;
      this.model.roles = null;
    });
  },
};
</script>
<style></style>
