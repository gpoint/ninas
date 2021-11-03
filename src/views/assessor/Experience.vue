<template>
<div>
    <div class="row pt-3" :class="classes">
        <div class="col-xl-12">
            <card shadow type="secondary">
                <template v-slot:header>
                    <div class="bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">My Experience</h3>
                            </div>
                            <modal v-model:show="modals.showExperienceModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                    <template v-slot:header>
                                        <div class="text-muted text-left mb--5">
                                            <h3>{{ addingExperience ? "Add" : "Edit" }} Job or Project</h3>
                                        </div>
                                    </template>
                                    <form role="form" @submit.prevent="addingExperience ? addExperience() : editExperience(); modals.showExperienceModal = false;">
                                        <div class="">
                                            <div class="row">
                                                <div class="col-md-5">
                                                    <base-input :required="true" alternative="" label="Position" placeholder="What role did you play?" input-classes="form-control-alternative" v-model:value="experienceModel.position" />
                                                </div>
                                                <div class="col-md-7">
                                                    <base-input :required="true" alternative="" label="Company / Project" placeholder="Where did you work?" input-classes="form-control-alternative" v-model:value="experienceModel.company" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <base-input :required="true" alternative="" label="Location" placeholder="Location" input-classes="form-control-alternative" v-model:value="experienceModel.location" />
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Start Month</label>
                                                        <select :required="true" class="form-control form-control-alternative" v-model="experienceModel.startMonth" style="width: 100%">
                                                            <option v-for="month in months" :key="month" :value="month">
                                                                {{ month }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <base-input :required="true" alternative="" pattern="[1-2][09][0129][0-9]" label="Start Year" placeholder="Start Year" input-classes="form-control-alternative" v-model:value="experienceModel.startYear" />
                                                </div>
                                                <div class="col-md-6 mb-3 pt-3">
                                                    <base-checkbox v-model:checked="experienceModel.currentlyWorking" class="custom-control-alternative pt-4">
                                                        <span class="text-info">
                                                            Are you still working here?
                                                        </span>
                                                    </base-checkbox>
                                                </div>
                                            </div>
                                            <div class="row" v-if="!experienceModel.currentlyWorking">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-control-label">End Month</label>
                                                        <select :required="true" class="form-control form-control-alternative" v-model="experienceModel.endMonth" style="width: 100%">
                                                            <option v-for="month in months" :key="month" :value="month">
                                                                {{ month }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <base-input :required="true" alternative="" pattern="[1-2][09][0129][0-9]" label="End Year" placeholder="End Year" input-classes="form-control-alternative" v-model:value="experienceModel.endYear" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <base-input alternative="" label="Description">
                                                            <textarea required rows="4" v-model="experienceModel.description" class="form-control form-control-alternative" placeholder="Describe your experience With a focus on the skills you gained ..."></textarea>
                                                        </base-input>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="d-none" ref="experienceFormSubmitButton" type="submit"></button>
                                        </div>
                                    </form>
                                    <template v-slot:footer>
                                        <div class="">
                                            <base-button type="warning" @click=" modals.showExperienceModal = false" class="my-1">
                                                Close
                                            </base-button>
                                            <base-button type="info" @click="$refs.experienceFormSubmitButton.click();" class="my-1 float-right">
                                                Save
                                            </base-button>
                                        </div>
                                    </template>
                                </card>
                            </modal>
                            <modal v-if="experienceIndex < experienceList.length" v-model:show="modals.showDeleteExperienceModal" gradient="danger" modal-classes="modal-danger modal-dialog-centered">
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
                                                    {{ experienceList[experienceIndex].position + "," }}
                                                </strong>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                {{ experienceList[experienceIndex].company }},
                                                <strong>
                                                    {{ experienceList[experienceIndex].location }}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <template v-slot:footer>
                                    <base-button type="white" @click="deleteExperience();modals.showDeleteExperienceModal = false">
                                        Yes, I'm sure!
                                    </base-button>
                                    <base-button type="white" text-color="info" class="ml-auto" @click="modals.showDeleteExperienceModal = false">
                                        Close
                                    </base-button>
                                </template>
                            </modal>

                            <div class="col-4 text-right">
                                <base-button :loading="modals.showExperienceModal || addInProgress" href="/profile" @click.prevent="experienceIndex = experienceList.length; modals.showExperienceModal = true; " class="btn btn-sm btn-default">
                                    <i class="fa fa-plus"></i>
                                    Experience
                                </base-button>
                            </div>
                        </div>
                    </div>
                </template>

                <form class="row">
                    <div readonly class="col-12 mb-3 btn-outline-danger text-default btn-block p-2" v-if="errorMessage != ''" @click="errorMessage = ''" style="background: #ffc8c8 !important; font-size: 0.775rem;border-radius:5px;">
                        <i class="fa fa-times float-right my-1 text-danger bg-white" style="height:16px;width:16px;border-radius:100%;padding:1px 0 0 4px;">
                        </i>
                        {{ errorMessage }}
                    </div>
                    <div class="col-lg-6 mb-4" v-for="(experience, index) in experienceList" :key="index">
                        <div class="card shadow" @mouseenter="experience.showDelete = true" @mouseleave="experience.showDelete = false">
                            <div class="card-header">
                                <h6 class="heading-small col-7 col-sm-11 text-muted my--2">
                                    {{ experience.startMonth + ", " + experience.startYear }}
                                    -
                                    {{ experience.currentlyWorking ? "Present" : experience.endMonth + ", " + experience.endYear }}
                                </h6>
                                <div class="float-right my--3">
                                    <base-button :class="experience.showDelete?'':'d-none'" :loading="deleteInProgress == experience.index" :disabled="editInProgress == experience.index" type="link" class="text-danger btn-sm my--3" @click="experienceIndex = index; modals.showDeleteExperienceModal = true;">
                                        Delete
                                    </base-button>
                                    <base-button :loading="editInProgress == experience.index" :disabled="deleteInProgress == experience.index" type="info" class="btn-sm my--3" @click="experienceIndex = index; modals.showExperienceModal = true;">
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
                                                <strong> {{ experience.location }} </strong>
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
</template>

<script>
import AssessorService from "../../api/services/assessor.service";
import Badge from "../../components/Badge.vue";

export default {
    components: {
        Badge
    },
    name: "experience",
    props: {
        classes: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            experienceIndex: 0,
            modals: {},
            experienceList: [],
            newExperience: {},
            addInProgress: false,
            editInProgress: {},
            deleteInProgress: {},
            errorMessage: "",
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
        addingExperience() {
            return this.experienceIndex == this.experienceList.length;
        },
        experienceModel() {
            return this.experienceIndex == this.experienceList.length ? this.newExperience : this.experienceList[this.experienceIndex];
        }
    },
    methods: {
        sortExperienceList(experienceList) {
            experienceList.forEach((degree, index) => {
                degree.index = index;
            });
            return experienceList.sort(
                (a, b) => new Date(b.startYear, this.months.indexOf(b.startMonth) + 1) - new Date(a.startYear, this.months.indexOf(a.startMonth) + 1)
            );
        },
        addExperience() {

            this.addInProgress = true;

            AssessorService.addJob(this.newExperience).then((response) => {

                this.newExperience = {}
                this.experienceIndex = 0;
                this.addInProgress = false;
                this.experienceList = this.sortExperienceList(response.data.result.experience);
            }).catch((error) => {
                this.addInProgress = false;
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        editExperience() {

            var experience = this.experienceList[this.experienceIndex];

            this.editInProgress = experience.index;

            AssessorService.updateJob(experience.index, experience).then((response) => {

                this.experienceIndex = 0;
                this.editInProgress = {};
                this.experienceList = this.sortExperienceList(response.data.result.experience);
            }).catch((error) => {
                this.editInProgress = {};
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        deleteExperience() {

            var experience = this.experienceList[this.experienceIndex];

            this.deleteInProgress = experience.index;

            AssessorService.deleteJob(experience.index).then((response) => {

                this.experienceIndex = 0;
                this.deleteInProgress = {};
                this.experienceList = this.sortExperienceList(response.data.result.experience);
            }).catch((error) => {
                this.deleteInProgress = {};
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        setExperienceList(list) {
            return (this.experienceList = list.sort(
                (a, b) => new Date(b.startDate) - new Date(a.startDate)
            ));
        },
    },
    mounted() {
        AssessorService.getProfile().then((response) => {

            this.experienceList = this.sortExperienceList(response.data.result.experience);
        })
    },
};
</script>

<style></style>
