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
        <div class="col-xl-12">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My Education</h3>
                  </div>
                  <modal
                    v-model:show="modals.showAddEducationModal"
                    body-classes="p-0"
                    modal-classes="modal-dialog-centered modal-lg"
                  >
                    <card
                      type="secondary"
                      shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-4"
                      class="border-0"
                    >
                      <template v-slot:header>
                        <div class="text-muted text-left mb--5">
                          <h3>Add Education</h3>
                        </div>
                      </template>
                      <form role="form">
                        <div class="">
                          <div class="row">
                            <div class="col-md-3">
                              <div class="form-group">
                                <label class="form-control-label">Degree</label>
                                <select
                                  class="form-control form-control-alternative"
                                  v-model="addEducationModel.degree"
                                  style="width: 100%"
                                >
                                  <option
                                    v-for="option in degreeOptions"
                                    :key="option"
                                    :value="option"
                                  >
                                    {{ option }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="col-md-9">
                              <base-input
                                alternative=""
                                label="Course"
                                placeholder="What did you study in school?"
                                input-classes="form-control-alternative"
                                v-model:value="addEducationModel.course"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-5">
                              <base-input
                                alternative=""
                                label="School"
                                placeholder="School"
                                input-classes="form-control-alternative"
                                v-model:value="addEducationModel.school"
                              />
                            </div>
                            <div class="col-lg-3">
                              <base-input
                                alternative=""
                                label="Country"
                                placeholder="Country"
                                input-classes="form-control-alternative"
                                v-model:value="addEducationModel.country"
                              />
                            </div>
                            <div class="col-lg-2">
                              <base-input
                                alternative=""
                                type="date"
                                label="Start Date"
                                placeholder="Start Date"
                                input-classes="form-control-alternative"
                                v-model:value="addEducationModel.startDate"
                              />
                            </div>
                            <div class="col-lg-2">
                              <base-input
                                alternative=""
                                type="date"
                                label="End Date"
                                placeholder="End Date"
                                input-classes="form-control-alternative"
                                v-model:value="addEducationModel.endDate"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-12 mb-3">
                              <base-checkbox
                                v-model:checked="
                                  addEducationModel.currentlyStudying
                                "
                                class="custom-control-alternative"
                              >
                                <span class="text-info">
                                  Are you still studying here?
                                </span>
                              </base-checkbox>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <base-input alternative="" label="Description">
                                  <textarea
                                    rows="4"
                                    v-model="addEducationModel.description"
                                    class="form-control form-control-alternative"
                                    placeholder="Describe your education With a focus on the skills you gained ..."
                                  ></textarea>
                                </base-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <template v-slot:footer>
                        <div class="">
                          <base-button
                            type="warning"
                            @click="modals.showAddEducationModal = false"
                            class="my-1"
                          >
                            Close
                          </base-button>
                          <base-button
                            type="info"
                            @click="addEducation"
                            class="my-1 float-right"
                          >
                            Save
                          </base-button>
                        </div>
                      </template>
                    </card>
                  </modal>
                  <modal
                    v-model:show="modals.showEditEducationModal"
                    body-classes="p-0"
                    modal-classes="modal-dialog-centered modal-lg"
                  >
                    <card
                      type="secondary"
                      shadow
                      header-classes="bg-white pb-5"
                      body-classes="px-lg-5 py-lg-4"
                      class="border-0"
                    >
                      <template v-slot:header>
                        <div class="text-muted text-left mb--5">
                          <h3>Add Education</h3>
                        </div>
                      </template>
                      <form role="form">
                        <div class="">
                          <div class="row">
                            <div class="col-sm-3">
                              <div class="form-group">
                                <label class="form-control-label">Degree</label>
                                <select
                                  class="form-control form-control-alternative"
                                  v-model="editEducationModel.degree"
                                  style="width: 100%"
                                >
                                  <option
                                    v-for="option in degreeOptions"
                                    :key="option"
                                    :value="option"
                                  >
                                    {{ option }}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div class="col-sm-9">
                              <base-input
                                alternative=""
                                label="Course"
                                placeholder="What did you study in school?"
                                input-classes="form-control-alternative"
                                v-model:value="editEducationModel.course"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-5">
                              <base-input
                                alternative=""
                                label="School"
                                placeholder="School"
                                input-classes="form-control-alternative"
                                v-model:value="editEducationModel.school"
                              />
                            </div>
                            <div class="col-lg-3 col-sm-6">
                              <base-input
                                alternative=""
                                label="Country"
                                placeholder="Country"
                                input-classes="form-control-alternative"
                                v-model:value="editEducationModel.country"
                              />
                            </div>
                            <div class="col-lg-2 col-sm-3">
                              <base-input
                                alternative=""
                                type="date"
                                label="Start Date"
                                placeholder="Start Date"
                                input-classes="form-control-alternative"
                                v-model:value="editEducationModel.startDate"
                              />
                            </div>
                            <div class="col-lg-2 col-sm-3">
                              <base-input
                                alternative=""
                                type="date"
                                label="End Date"
                                placeholder="End Date"
                                input-classes="form-control-alternative"
                                v-model:value="editEducationModel.endDate"
                              />
                            </div>
                          </div>
                          <div class="row">
                            <div class="col-lg-12 mb-3">
                              <base-checkbox
                                v-model:checked="
                                  editEducationModel.currentlyStudying
                                "
                                class="custom-control-alternative"
                              >
                                <span class="text-info">
                                  Are you still studying here?
                                </span>
                              </base-checkbox>
                            </div>
                            <div class="col-lg-12">
                              <div class="form-group">
                                <base-input alternative="" label="Description">
                                  <textarea
                                    rows="4"
                                    v-model="editEducationModel.description"
                                    class="form-control form-control-alternative"
                                    placeholder="Describe your education With a focus on the skills you gained ..."
                                  ></textarea>
                                </base-input>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                      <template v-slot:footer>
                        <div class="">
                          <base-button
                            type="warning"
                            @click="modals.showEditEducationModal = false"
                            class="my-1"
                          >
                            Close
                          </base-button>
                          <base-button
                            type="info"
                            @click="editEducation"
                            class="my-1 float-right"
                          >
                            Save
                          </base-button>
                        </div>
                      </template>
                    </card>
                  </modal>
                  <modal
                    v-model:show="modals.showDeleteEducationModal"
                    gradient="danger"
                    modal-classes="modal-danger modal-dialog-centered"
                  >
                    <template v-slot:header>
                      <h6 class="modal-title" id="modal-title-notification">
                        Your attention is required
                      </h6>
                    </template>
                    <div class="py-3 text-center">
                      <i class="ni ni-bell-55 ni-3x"></i>
                      <h4 class="heading mt-4">Deleting, Are you sure?</h4>
                      <div class="pl-2 mt--2">
                        <div class="row mb-2">
                          <div class="col-md-12">
                            <hr class="my-1" />
                            <strong>
                              {{ deleteEducationModel.degree + "," }}
                            </strong>
                            {{ deleteEducationModel.course }}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            {{ deleteEducationModel.school }},
                            <strong>
                              {{ deleteEducationModel.country }}
                            </strong>
                            <badge
                              type="white"
                              class="float-right"
                              v-if="deleteEducationModel.currentlyStudying"
                            >
                              You are still studying here.
                            </badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <template v-slot:footer>
                      <base-button type="white" @click="deleteEducation">
                        Yes, I'm sure!
                      </base-button>
                      <base-button
                        type="white"
                        text-color="info"
                        class="ml-auto"
                        @click="modals.showDeleteEducationModal = false"
                      >
                        Close
                      </base-button>
                    </template>
                  </modal>

                  <div class="col-4 text-right">
                    <a
                      href="/profile"
                      @click.prevent="modals.showAddEducationModal = true"
                      class="btn btn-sm btn-default"
                    >
                      <i class="fa fa-plus"></i>
                      Education
                    </a>
                  </div>
                </div>
              </div>
            </template>

            <form class="row">
              <div
                class="col-lg-6 mb-4"
                v-for="education in educationList"
                :key="education.id"
              >
                <div class="card shadow">
                  <div class="card-header">
                    <h6 class="heading-small col-7 col-sm-11 text-muted my--2">
                      {{ getDate(education.startDate) }}
                      -
                      {{ getDate(education.endDate) }}
                    </h6>
                    <div class="float-right my--3">
                      <base-button
                        type="link"
                        class="text-danger btn-sm my--3"
                        @click="
                          deleteEducationModel = education;
                          modals.showDeleteEducationModal = true;
                        "
                      >
                        Delete
                      </base-button>
                      <base-button
                        type="info"
                        class="btn-sm my--3"
                        @click="
                          editEducationModel = education;
                          modals.showEditEducationModal = true;
                        "
                      >
                        Update
                      </base-button>
                    </div>
                  </div>
                  <div class="card-body">
                    <div>
                      <div class="pl-2 mt--2">
                        <div class="row mb-2">
                          <div class="col-md-12">
                            <strong> {{ education.degree }} </strong>,
                            {{ education.course }}
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-12">
                            {{ education.school }},
                            <strong> {{ education.country }} </strong>
                            <badge
                              type="success"
                              class="float-right"
                              v-if="education.currentlyStudying"
                            >
                              Present
                            </badge>
                          </div>
                        </div>
                      </div>
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
import EducationService from "../api/services/education.service";
import Badge from "../components/Badge.vue";

export default {
  components: { Badge },
  name: "education",
  data() {
    return {
      addEducationModel: {},
      editEducationModel: {},
      deleteEducationModel: {},
      modals: {},
      degreeOptions: [
        "GSCE",
        "WASSCE",
        "NABTEB",
        "TRADE TEST 1",
        "TRADE TEST 2",
        "TRADE TEST 3",
        "NSQ LEVEL 1",
        "NSQ LEVEL 2",
        "NSQ LEVEL 3",
        "DIPLOMA",
        "BACHELOR'S",
        "MASTER'S",
      ],
      educationModal: {},
      educationList: [],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  computed: {
    sortedEducationList() {
      var educationList = this.educationList;
      return educationList.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
      );
    },
  },
  methods: {
    addEducation() {
      EducationService.addEducation(this.addEducationModel).then((response) => {
        this.educationList.push(response.data.result);
        this.setEducationList(this.educationList);
      });
      this.modals.showAddEducationModal = false;
      this.addEducationModel = {};
    },
    editEducation() {
      EducationService.saveEducation(this.editEducationModel).then(() => {
        EducationService.getEducationList().then((response) => {
          this.setEducationList(response.data.result);
        });
      });
      this.modals.showEditEducationModal = false;
      this.editEducationModel = {};
    },
    deleteEducation() {
      EducationService.deleteEducation(this.deleteEducationModel.id).then(
        () => {
          EducationService.getEducationList().then((response) => {
            this.setEducationList(response.data.result);
          });
        }
      );
      this.modals.showDeleteEducationModal = false;
      this.deleteEducationModel = {};
    },
    setEducationList(list) {
      return (this.educationList = list.sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      ));
    },
    getDate(val) {
      var date = new Date(val);
      return this.months[date.getMonth()] + ", " + date.getFullYear();
    },
  },
  mounted() {
    UserService.getProfile().then((response) => {
      // this.addEducationModel = response.data.result;
      console.info(response);
    });
    EducationService.getEducationList().then((response) => {
      this.educationList = response.data.result;
    });
  },
};
</script>
<style></style>
