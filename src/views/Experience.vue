<template>
<div>
    <base-header class="header pb-8 pt-5 pt-md-6 d-flex align-items-center">
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
                                    <h3 class="mb-0">My Experience</h3>
                                </div>
                                <modal v-model:show="modals.showAddExperienceModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                        <template v-slot:header>
                                            <div class="text-muted text-left mb--5">
                                                <h3>Add Experience</h3>
                                            </div>
                                        </template>
                                        <div>
                                            <div class="">
                                                <div class="row">
                                                    <div class="col-md-9">
                                                        <base-input alternative="" label="Position" placeholder="What was your role / function?" input-classes="form-control-alternative" v-model:value="addExperienceModel.position" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5">
                                                        <base-input alternative="" label="Company" placeholder="Company" input-classes="form-control-alternative" v-model:value="addExperienceModel.company" />
                                                    </div>
                                                    <div class="col-lg-3">
                                                        <base-input alternative="" label="Location" placeholder="Location" input-classes="form-control-alternative" v-model:value="addExperienceModel.country" />
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <base-input alternative="" type="date" label="Start Date" placeholder="Start Date" input-classes="form-control-alternative" v-model:value="addExperienceModel.startDate" />
                                                    </div>
                                                    <div class="col-lg-2">
                                                        <base-input alternative="" type="date" label="End Date" placeholder="End Date" input-classes="form-control-alternative" v-model:value="addExperienceModel.endDate" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12 mb-3">
                                                        <base-checkbox v-model:checked="
                                  addExperienceModel.currentlyWorking
                                " class="custom-control-alternative">
                                                            <span class="text-info">
                                                                Are you still working here?
                                                            </span>
                                                        </base-checkbox>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <base-input alternative="" label="Description">
                                                                <textarea rows="4" v-model="addExperienceModel.description" class="form-control form-control-alternative" placeholder="Describe your education With a focus on the skills you gained ..."></textarea>
                                                            </base-input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <template v-slot:footer>
                                            <div class="">
                                                <base-button type="warning" @click="modals.showAddExperienceModal = false" class="my-1">
                                                    Close
                                                </base-button>
                                                <base-button type="info" @click="addExperience" class="my-1 float-right">
                                                    Save
                                                </base-button>
                                            </div>
                                        </template>
                                    </card>
                                </modal>
                                <modal v-model:show="modals.showEditExperienceModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                    <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                        <template v-slot:header>
                                            <div class="text-muted text-left mb--5">
                                                <h3>Add Experience</h3>
                                            </div>
                                        </template>
                                        <div>
                                            <div class="">
                                                <div class="row">
                                                    <div class="col-sm-9">
                                                        <base-input alternative="" label="Position" placeholder="What was your role / function?" input-classes="form-control-alternative" v-model:value="editExperienceModel.position" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-5">
                                                        <base-input alternative="" label="Company" placeholder="Company" input-classes="form-control-alternative" v-model:value="editExperienceModel.company" />
                                                    </div>
                                                    <div class="col-lg-3 col-sm-6">
                                                        <base-input alternative="" label="Location" placeholder="Location" input-classes="form-control-alternative" v-model:value="editExperienceModel.country" />
                                                    </div>
                                                    <div class="col-lg-2 col-sm-3">
                                                        <base-input alternative="" type="date" label="Start Date" placeholder="Start Date" input-classes="form-control-alternative" v-model:value="editExperienceModel.startDate" />
                                                    </div>
                                                    <div class="col-lg-2 col-sm-3">
                                                        <base-input alternative="" type="date" label="End Date" placeholder="End Date" input-classes="form-control-alternative" v-model:value="editExperienceModel.endDate" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-lg-12 mb-3">
                                                        <base-checkbox v-model:checked="
                                  editExperienceModel.currentlyWorking
                                " class="custom-control-alternative">
                                                            <span class="text-info">
                                                                Are you still working here?
                                                            </span>
                                                        </base-checkbox>
                                                    </div>
                                                    <div class="col-lg-12">
                                                        <div class="form-group">
                                                            <base-input alternative="" label="Description">
                                                                <textarea rows="4" v-model="editExperienceModel.description" class="form-control form-control-alternative" placeholder="Describe your experience With a focus on the skills you gained ..."></textarea>
                                                            </base-input>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <template v-slot:footer>
                                            <div class="">
                                                <base-button type="warning" @click="modals.showEditExperienceModal = false" class="my-1">
                                                    Close
                                                </base-button>
                                                <base-button type="info" @click="editExperience" class="my-1 float-right">
                                                    Save
                                                </base-button>
                                            </div>
                                        </template>
                                    </card>
                                </modal>
                                <modal v-if="deleteIndex != null" v-model:show="modals.showDeleteExperienceModal" gradient="danger" modal-classes="modal-danger modal-dialog-centered">
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
                                                    {{ experienceList[deleteIndex].position }}
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    {{ experienceList[deleteIndex].company }},
                                                    <strong>
                                                        {{ experienceList[deleteIndex].country }}
                                                    </strong>
                                                    <badge type="white" class="float-right" v-if="
                                experienceList[deleteIndex].currentlyWorking
                              ">
                                                        You are still working here.
                                                    </badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <template v-slot:footer>
                                        <base-button type="white" @click="deleteExperience">
                                            Yes, I'm sure!
                                        </base-button>
                                        <base-button type="white" text-color="info" class="ml-auto" @click="modals.showDeleteExperienceModal = false">
                                            Close
                                        </base-button>
                                    </template>
                                </modal>

                                <div class="col-4 text-right">
                                    <a href="/profile" @click.prevent="modals.showAddExperienceModal = true" class="btn btn-sm btn-success">
                                        <i class="fa fa-plus"></i>
                                        Experience
                                    </a>
                                </div>
                            </div>
                        </div>
                    </template>

                    <form class="row">
                        <div class="col-md-6 mb-4" v-for="(experience, index) in experienceList" :key="experience.id">
                            <div class="card shadow">
                                <div class="card-header">
                                    <h6 class="heading-small text-muted my--2">
                                        {{ "From: " + getDate(experience.startDate) }}
                                        -
                                        {{ "" + getDate(experience.endDate) }}
                                    </h6>
                                    <div class="float-right my--3">
                                        <base-button type="link" class="text-danger btn-sm my--3" @click="
                          deleteIndex = index;
                          modals.showDeleteExperienceModal = true;
                        ">
                                            Delete
                                        </base-button>
                                        <base-button type="info" class="btn-sm my--3" @click="
                          editExperienceModel = experience;
                          deleteIndex = index;
                          modals.showEditExperienceModal = true;
                        ">
                                            Update
                                        </base-button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div>
                                        <div class="pl-2 mt--2">
                                            <div class="row mb-2">
                                                <div class="col-md-12">
                                                    <strong> {{ experience.position }} </strong>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-12">
                                                    {{ experience.company }},
                                                    <strong> {{ experience.country }} </strong>
                                                    <badge type="success" class="float-right" v-if="experience.currentlyWorking">
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
import ExperienceService from "../api/services/experience.service";
import Badge from "../components/Badge.vue";

export default {
    components: {
        Badge
    },
    name: "experience",
    data() {
        return {
            addExperienceModel: {},
            editExperienceModel: {},
            deleteIndex: null,
            modals: {},
            experienceModal: {},
            experienceList: [],
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
        sortedExperienceList() {
            var experienceList = this.experienceList;
            return experienceList.sort(
                (a, b) => new Date(a.startDate) - new Date(b.startDate)
            );
        },
    },
    methods: {
        addExperience() {
            ExperienceService.addExperience(this.addExperienceModel).then(
                (response) => {
                    this.experienceList.push(response.data.result);
                    this.setExperienceList(this.experienceList);
                }
            );
            this.modals.showAddExperienceModal = false;
            this.addExperienceModel = {};
        },
        editExperience() {
            ExperienceService.saveExperience(this.editExperienceModel, this.deleteIndex).then(
                () => {
                    ExperienceService.getExperienceList().then((response) => {
                        this.setExperienceList(response.data.result);
                    });
                }
            );
            this.modals.showEditExperienceModal = false;
            this.editExperienceModel = {};
        },
        deleteExperience() {
            ExperienceService.deleteExperience(this.deleteIndex).then(() => {
                ExperienceService.getExperienceList().then((response) => {
                    this.setExperienceList(response.data.result);
                });
                return 1;
            });
            this.modals.showDeleteExperienceModal = false;
            this.deleteExperienceModel = {};
        },
        setExperienceList(list) {
            this.experienceList = list.sort(
                (a, b) => new Date(b.startDate) - new Date(a.startDate)
            );
        },
        getDate(val) {
            var date = new Date(val);
            return this.months[date.getMonth()] + ", " + date.getFullYear();
        },
    },
    mounted() {
        ExperienceService.getExperienceList().then((response) => {
            this.experienceList = response.data.result;
        });
    },
};
</script>

<style></style>
