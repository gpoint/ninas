<template>
<div>
    <base-header class="header pb-8 pt-5 pt-md-6 d-flex align-items-center" style="
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      ">
        <!-- Mask -->
        <span class="mask bg-gradient-default opacity-8"></span>
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

    <div class="modals">
        <modal v-model:show="profile.modals.showPhotoModal" body-classes="p-0" modal-classes="modal-dialog-centered">
            <card type="secondary" shadow header-classes="bg-white pb-5" body-classes="px-lg-5 py-lg-4" class="border-0">
                <template v-slot:header>
                    <div class="text-muted text-left mb--5">
                        <h3>Upload Profile Picture</h3>
                    </div>
                </template>
                <form role="form" class="text-center" title="Click To Upload New Profile Picture">
                    <label v-show="profile.selectedPhoto == null" class="img-overlay-wrapper" style="border-radius:100%;">
                        <img :src="user.photoUrl == null ? 'img/theme/user.jpg' : user.photoUrl" class="border-info user-img" />
                        <div class="overlay">
                            <div class="text"><i class="fa fa-2x fa-camera"></i></div>
                        </div>
                        <input type="file" accept="image/*" @change="onFileSelect" class="d-none">
                    </label>
                    <div v-show="profile.selectedPhoto != null">
                        <vue-cropper ref="cropper" :src="profile.selectedPhoto" :aspect-ratio="1" alt="Source Image"></vue-cropper>
                    </div>
                </form>
                <template v-slot:footer>
                    <div class="">
                        <base-button type="danger" @click="profile.selectedPhoto = null; profile.modals.showPhotoModal = false;" class="my-1">
                            Close
                        </base-button>
                        <base-button v-if="profile.selectedPhoto != null" type="info" @click="uploadProfilePicture(); profile.modals.showPhotoModal = false;" class="my-1 float-right">
                            Save
                        </base-button>
                    </div>
                </template>
            </card>
        </modal>
    </div>

    <div class="container-fluid mt--7">
        <div class="row">
            <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
                <div class="card card-profile shadow">
                    <div class="row justify-content-center">
                        <div class="col-lg-3 order-lg-2">
                            <div class="card-profile-image">
                                <a href="#" @click.prevent="profile.modals.showPhotoModal=true;" class="image-overlay-wrapper">
                                    <img :src="user.photoUrl == '' ? 'img/theme/user.jpg' : user.photoUrl" class="rounded-circle user-img" style="width:180px;height:180px;" />
                                    <div class="overlay">
                                        <div class="text"><i class="fa fa-2x fa-camera"></i></div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                        <form id="profilePictureForm" class="d-flex justify-content-between">
                            <base-button :loading="profile.pictureLoading || profile.modals.showPhotoModal" size="sm" type="default" class="mr-4" @click="profile.modals.showPhotoModal=true;">Change Picture</base-button>
                            <router-link to="/account" class="btn btn-sm btn-danger float-right">
                                Update Account
                            </router-link>
                        </form>
                    </div>
                    <div class="card-body pt-0 pt-md-4">
                        <div class="row">
                            <div class="col">
                                <div class="card-profile-stats d-flex justify-content-center mt-md-5"></div>
                            </div>
                        </div>
                        <div class="text-center">
                            <h3>
                                {{ user.name }}
                            </h3>
                            <div class="h5 font-weight-300">
                                <i class="ni location_pin mr-2"></i>
                                <strong> {{ profile.model.city }} </strong>,
                                {{ profile.model.stateOfResidence }}
                            </div>
                            <div class="h5 mt-4">
                                <i class="ni business_briefcase-24 mr-2"></i>{{ user.email }} - {{ user.phone }}
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
                                    <base-button :loading="profile.loading" @click="saveProfile" class="btn btn-sm btn-default">Save</base-button>
                                </div>
                            </div>
                        </div>
                    </template>

                    <form>
                        <form-message v-model:type="profile.formMessageType" v-model:message="profile.formMessage"></form-message>
                        <h6 class="heading-small text-muted mb-4">Assessor information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <div class="form-group">
                                        <label class="form-control-label">Gender</label>
                                        <select :disabled="profile.loading" class="form-control-alternative form-control" v-model="profile.model.gender" style="width: 100%">
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    <base-input :disabled="profile.loading" alternative="" type="date" label="Date Of Birth" placeholder="Date Of Birth" input-classes="form-control-alternative" v-model:value="profile.model.dateOfBirth" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label">
                                            Trade ( Area Of Specialty )
                                        </label>
                                        <select :disabled="profile.loading" class="form-control-alternative form-control" v-model="profile.model.trade" style="width: 100%">
                                            <option v-for="trade in trades" :key="trade" :value="trade">
                                                {{ trade }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label">
                                            Years Of Experience
                                        </label>
                                        <select :disabled="profile.loading" class="form-control-alternative form-control" v-model="profile.model.yearsOfExperience" style="width: 100%">
                                            <option v-for="year in 19" :key="year" :value="year">
                                                {{ year }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label">
                                            Contesting Cateogry
                                        </label>
                                        <select :disabled="profile.loading" class="form-control-alternative form-control" v-model="profile.model.category" style="width: 100%">
                                            <option :value="'Assessor Of The Year ( ' + profile.model.gender + ' )'" v-if="profile.model.gender != null && profile.model.gender != ''">
                                                Assessor Of The Year ( {{ profile.model.gender }} )
                                            </option>
                                            <option :value="profile.model.trade + ' Of The Year'" v-if="profile.model.trade != null && profile.model.trade != ''">
                                                {{ profile.model.trade }} Of The Year
                                            </option>
                                            <option value="Apprentice Of The Year">
                                                Apprentice Of The Year
                                            </option>
                                            <option value="Instructor Of The Year">
                                                Instructor Of The Year
                                            </option>
                                        </select>
                                    </div>
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
                                    <base-input :disabled="profile.loading" alternative="" label="Address" placeholder="Home Address" input-classes="form-control-alternative" v-model:value="profile.model.address" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-4">
                                    <base-input :disabled="profile.loading" alternative="" label="City / L.G.A" placeholder="City" input-classes="form-control-alternative" v-model:value="profile.model.city" />
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label">
                                            State Of Residence
                                        </label>
                                        <select class="form-control-alternative form-control" v-model="profile.model.stateOfResidence" style="width: 100%">
                                            <option v-for="state in states" :key="state" :value="state">
                                                {{ state }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="form-group">
                                        <label class="form-control-label">State Of Origin</label>
                                        <select :disabled="profile.loading" class="form-control-alternative form-control" v-model="profile.model.stateOfOrigin" style="width: 100%">
                                            <option v-for="state in states" :key="state" :value="state">
                                                {{ state }}
                                            </option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <!-- Description -->
                        <h6 class="heading-small text-muted mb-4">Contestant Details</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-12">
                                    <div class="form-group">
                                        <base-input :disabled="profile.loading" alternative="" label="About Me">
                                            <textarea rows="4" v-model="profile.model.description" class="form-control form-control-alternative" placeholder="A few words about why you are in the best position receive the award ..."></textarea>
                                        </base-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </card>
            </div>
        </div>

      <Education id="education" classes="mt-3"></Education>

      <Experience id="experience" classes="mt-3"></Experience>

      <Referees id="referees" classes="mt-3"></Referees>

    </div>
</div>
</template>

<script>
import UserService from "../api/services/user.service";
import AssessorService from "../api/services/assessor.service";
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import Education from './assessor/Education.vue';
import Experience from './assessor/Experience.vue';
import Referees from './assessor/Referees.vue';
import FormMessage from '../components/FormMessage.vue';

export default {
    name: "assessor-profile",
    components: {
        VueCropper,
        Education,
        Experience,
        Referees,
        FormMessage,
    },
    data() {
        return {
            user: {},
            profile: {
                model: {},
                loading: false,
                formMessage: "",
                formMessageType: "",
                selectedPhoto: null,
                pictureLoading: false,
                modals: {},
            },
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
                "FCT",
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
            this.profile.loading = true;
            AssessorService.saveProfile(this.profile.model).then((response) => {
                this.profile.loading = false;
                this.profile.formMessage = "";
                this.profile.model = response.data.result;
                this.profile.formMessage = response.data.message;
                this.profile.formMessageType = "success"
            }).catch((error) => {
                this.profile.loading = false;
                this.profile.formMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message;
                this.profile.formMessageType = "danger"
            });
        },
        uploadProfilePicture() {

            this.profile.pictureLoading = true;

            var formData = new FormData();

            this.$refs.cropper.getCroppedCanvas().toBlob((blob) => {

                formData.append("file", blob, "photo.jpg");

                UserService.uploadProfilePicture(formData).then((response) => {
                    if (response.data.isSuccess) {
                        user.photoUrl = this.$refs.cropper.getCroppedCanvas().toDataUrl();
                        // user.
                        window.location.reload();
                    }
                    this.profile.pictureLoading = false;
                }).catch((error) => {
                    this.profile.pictureLoading = false;
                    this.profile.formMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message;
                this.profile.formMessageType = "danger"
                });
            })

        },
        onFileSelect(e) {
            const file = e.target.files[0];

            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.profile.selectedPhoto = event.target.result;
                    this.$refs.cropper.replace(this.profile.selectedPhoto)
                }
                reader.readAsDataURL(file);
            } else {
                this.profile.formMessage = "Sorry, FileReader API not supported";
            }
        },
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('user')).user;
        AssessorService.getProfile().then((response) => {
            this.profile.loading = false;
            this.profile.model = response.data.result;
        }).catch((error) => {
            this.profile.loading = false;
            window.location.reload();
        });
    },
};
</script>

<style scoped>
.img-overlay-wrapper {
    position: relative;
    width: 50%;
}

.user-img {
    opacity: 1;
    display: block;
    width: 100%;
    height: auto;
    transition: .5s ease;
    backface-visibility: hidden;
    border-radius: 100%;
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 100%;
    border: 4px solid #fff;
    box-shadow: 0px 3px 10px grey !important;
}

.overlay {
    transition: .5s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;
}

.img-overlay-wrapper:hover .user-img {
    opacity: 0.3;
}

.img-overlay-wrapper:hover .overlay {
    opacity: 1;
}

.text {
    background-color: #336;
    color: #ffffff;
    font-size: 16px;
    border-radius: 20px;
    padding: 16px 32px;
    opacity: 0.8;
}
</style>
