<template>
<div>
    <div class="row pt-3" :class="classes">
        <div class="col-xl-12">
            <card shadow type="secondary">
                <template v-slot:header>
                    <div class="bg-white border-0">
                        <div class="row align-items-center">
                            <div class="col-8">
                                <h3 class="mb-0">My Education</h3>
                            </div>
                            <modal v-model:show="modals.showEducationCertificate" v-if="modals.showEducationCertificate" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                    <template v-slot:header>
                                        <div class="text-muted text-left mb--5">
                                            <h3> Academic Qualification / Degree Certificate </h3>
                                        </div>
                                        <base-button size="sm" type="danger" class="float-right mb--3" @click=" modals.showEducationCertificate = false">
                                            Close
                                        </base-button>
                                    </template>
                                    <div class="">
                                        <img :src="educationList[educationIndex].certificateUrl" alt="" style="width: 100% !important;">
                                    </div>
                                    <template v-slot:footer>
                                        <div class="">
                                        </div>
                                    </template>
                                </card>
                            </modal>
                            <modal v-model:show="modals.showEducationModal" body-classes="p-0" modal-classes="modal-dialog-centered modal-lg">
                                <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                                    <template v-slot:header>
                                        <div class="text-muted text-left mb--5">
                                            <h3>{{ addingEducation ? "Add" : "Edit" }} Academic Qualification / Degree</h3>
                                        </div>
                                        <base-button size="sm" type="danger" class="float-right mb--3" @click=" modals.showEducationModal = false">
                                            Close
                                        </base-button>
                                    </template>
                                    <form role="form" @submit.prevent="addingEducation ? addEducation() : editEducation(); modals.showEducationModal = false;">
                                        <div class="">
                                            <div class="row">
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Degree / Qualification</label>
                                                        <select :required="true" class="form-control form-control-alternative" v-model="educationModel.degree" style="width: 100%">
                                                            <option v-for="option in degreeOptions" :key="option" :value="option">
                                                                {{ option }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-9">
                                                    <base-input :required="true" alternative="" label="Course" placeholder="What did you study in school?" input-classes="form-control-alternative" v-model:value="educationModel.course" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-5">
                                                    <base-input :required="true" alternative="" label="School" placeholder="School" input-classes="form-control-alternative" v-model:value="educationModel.school" />
                                                </div>
                                                <div class="col-lg-7">
                                                    <base-input :required="true" alternative="" label="Location" placeholder="Location" input-classes="form-control-alternative" v-model:value="educationModel.location" />
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-control-label">Start Month</label>
                                                        <select :required="true" class="form-control form-control-alternative" v-model="educationModel.startMonth" style="width: 100%">
                                                            <option v-for="month in months" :key="month" :value="month">
                                                                {{ month }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <base-input :required="true" alternative="" pattern="[1-2][09][0129][0-9]" label="Start Year" placeholder="Start Year" input-classes="form-control-alternative" v-model:value="educationModel.startYear" />
                                                </div>
                                                <div class="col-md-3">
                                                    <div class="form-group">
                                                        <label class="form-control-label">End Month</label>
                                                        <select :required="true" class="form-control form-control-alternative" v-model="educationModel.endMonth" style="width: 100%">
                                                            <option v-for="month in months" :key="month" :value="month">
                                                                {{ month }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="col-md-2">
                                                    <base-input :required="true" alternative="" pattern="[1-2][09][0129][0-9]" label="End Year" placeholder="End Year" input-classes="form-control-alternative" v-model:value="educationModel.endYear" />
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-lg-12">
                                                    <div class="form-group">
                                                        <base-input alternative="" label="Description">
                                                            <textarea required rows="4" v-model="educationModel.description" class="form-control form-control-alternative" placeholder="Describe your education With a focus on the skills you gained ..."></textarea>
                                                        </base-input>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="d-none" ref="educationFormSubmitButton" type="submit"></button>
                                        </div>
                                    </form>
                                    <template v-slot:footer>
                                        <div class="">
                                            <label v-if="!addingEducation" :disabled="uploadingCertificate?true:null" class="btn btn-warning">
                                                <input class="d-none" type="file" ref="educationCertInput" @change="uploadCertificate();">
                                                Upload Certificate
                                            </label>
                                            <base-button :loading="uploadingCertificate" type="info" @click="$refs.educationFormSubmitButton.click();" class="my-1 float-right">
                                                Save
                                            </base-button>
                                        </div>
                                    </template>
                                </card>
                            </modal>
                            <modal v-if="educationIndex < educationList.length" v-model:show="modals.showDeleteEducationModal" gradient="danger" modal-classes="modal-danger modal-dialog-centered">
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
                                                    {{ educationList[educationIndex].degree + "," }}
                                                </strong>
                                                {{ educationList[educationIndex].course }}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12">
                                                {{ educationList[educationIndex].school }},
                                                <strong>
                                                    {{ educationList[educationIndex].location }}
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <template v-slot:footer>
                                    <base-button type="white" @click="deleteEducation();modals.showDeleteEducationModal = false">
                                        Yes, I'm sure!
                                    </base-button>
                                    <base-button type="white" text-color="info" class="ml-auto" @click="modals.showDeleteEducationModal = false">
                                        Close
                                    </base-button>
                                </template>
                            </modal>
                            <modal v-if="educationIndex < educationList.length" v-model:show="modals.showImageModal" gradient="secondary" modal-classes="modal modal-dialog-centered" style="overflow-y: scroll;">
                                <template v-slot:header>
                                    <div class="modal-title" id="modal-title-notification">
                                        <h6>
                                            This is a picture of the certificate acquired after the completion of this education track.
                                        </h6>
                                    </div>
                                </template>
                                <div class=" text-center mt--5 p-5">
                                    <image-upload class="col-md-12" :ratio="3/4" type="Certificate" :url="'assessor/certificate/' + educationIndex " v-model:src="educationModel.certificateURL"></image-upload>
                                </div>

                                <template v-slot:footer>
                                    <base-button type="white" text-color="info" class="ml-auto" @click="modals.showImageModal = false">
                                        Close
                                    </base-button>
                                </template>
                            </modal>

                            <div class="col-4 text-right">
                                <base-button :loading="modals.showEducationModal || addInProgress" href="/profile" @click.prevent="educationIndex = educationList.length; modals.showEducationModal = true; " class="btn btn-sm btn-default">
                                    <i class="fa fa-plus"></i>
                                    Education
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
                    <div class="col-lg-6 mb-4" v-for="(education, index) in educationList" :key="index">
                        <div class="card shadow" @mouseenter="education.showDelete = true" @mouseleave="education.showDelete = false">
                            <div class="card-header">
                                <h6 class="heading-small col-7 col-sm-11 text-muted my--2">
                                    {{ education.startMonth + ", " + education.startYear }}
                                    -
                                    {{ education.endMonth + ", " + education.endYear }}
                                </h6>
                                <div class="float-right my--3">
                                    <base-button :class="education.showDelete?'':'d-none'" :loading="deleteInProgress == education.index" :disabled="editInProgress == education.index" type="link" class="text-danger btn-sm my--3" @click="educationIndex = index; modals.showDeleteEducationModal = true;">
                                        Delete
                                    </base-button>
                                    <base-button :loading="editInProgress == education.index" :disabled="deleteInProgress == education.index" type="info" class="btn-sm my--3" @click="educationIndex = index; modals.showEducationModal = true;">
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
                                            <div class="col-8">
                                                {{ education.school }},
                                                <strong> {{ education.location }} </strong>
                                            </div>
                                            <div v-if="education.certificateUrl != null" class="col-4">
                                                <base-button size="sm" @click="educationIndex = index;modals.showEducationCertificate = true;">View Certificate</base-button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <base-button class="card-footer btn-lg bg-success" type="info" @click="educationIndex = index; modals.showImageModal = true;">
                                    Service Preview Images
                                </base-button>
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
import ImageUpload from '@/components/ImageUpload.vue';

export default {
    components: {
        Badge,
        ImageUpload
    },
    name: "education",
    props: {
        classes: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            educationIndex: 0,
            modals: {},
            educationList: [],
            newEducation: {},
            addInProgress: false,
            editInProgress: {},
            deleteInProgress: {},
            uploadingCertificate: false,
            errorMessage: "",
            degreeOptions: [
                "Diploma",
                "BSc",
                "MSc",
                "PhD",
                "Others",
            ],
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
        addingEducation() {
            return this.educationIndex == this.educationList.length;
        },
        educationModel() {
            return this.educationIndex == this.educationList.length ? this.newEducation : this.educationList[this.educationIndex];
        }
    },
    methods: {
        sortEducationList(educationList) {
            educationList.forEach((degree, index) => {
                degree.index = index;
            });
            return educationList.sort(
                (a, b) => new Date(b.startYear, this.months.indexOf(b.startMonth) + 1) - new Date(a.startYear, this.months.indexOf(a.startMonth) + 1)
            );
        },
        addEducation() {

            this.addInProgress = true;

            AssessorService.addAcademicDegree(this.newEducation).then((response) => {

                this.newEducation = {}
                this.educationIndex = 0;
                this.addInProgress = false;
                this.educationList = this.sortEducationList(response.data.result.education);
            }).catch((error) => {
                this.addInProgress = false;
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        editEducation() {

            var education = this.educationList[this.educationIndex];

            this.editInProgress = education.index;

            AssessorService.updateAcademicDegree(education.index, education).then((response) => {

                this.educationIndex = 0;
                this.editInProgress = {};
                this.educationList = this.sortEducationList(response.data.result.education);
            }).catch((error) => {
                this.editInProgress = {};
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        uploadCertificate() {

            var formData = new FormData();
            formData.append("file", this.$refs.educationCertInput.files[0], "photo.jpg");

            AssessorService.uploadDegreeCertificate(this.educationIndex, formData).then((response) => {

                this.uploadingCertificate = false;
                this.modals.showEducationModal = false;
                this.educationList = this.sortEducationList(response.data.result.education);
            }).catch((error) => {
                this.profile.formMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message;
                this.uploadingCertificate = false;
            });
        },
        deleteEducation() {

            var education = this.educationList[this.educationIndex];

            this.deleteInProgress = education.index;

            AssessorService.deleteAcademicDegree(education.index).then((response) => {

                this.educationIndex = 0;
                this.deleteInProgress = {};
                this.educationList = this.sortEducationList(response.data.result.education);
            }).catch((error) => {
                this.deleteInProgress = {};
                this.errorMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message
            });
        },
        setEducationList(list) {
            return (this.educationList = list.sort(
                (a, b) => new Date(b.startDate) - new Date(a.startDate)
            ));
        },
    },
    mounted() {
        AssessorService.getProfile().then((response) => {

            this.educationList = this.sortEducationList(response.data.result.education);
        })
    },
};
</script>

<style></style>
