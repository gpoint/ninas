<template>
<div>
    <base-header class="header pb-8 pt-5 pt-md-6 d-flex align-items-center" style="
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      ">
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
            <form class="col-xl-7 order-xl-1"  @submit.prevent="saveProfile">
                <card shadow type="secondary">
                    <template v-slot:header>
                        <div class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">My Account</h3>
                                </div>
                                <div class="col-4 text-right">
                                    <base-button native-type="submit" v-model:loading="loading" class="btn btn-sm btn-default">Save</base-button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div>
                      <form-message v-model:type="messageType" v-model:message="message" ></form-message>
                        <h6 class="heading-small text-muted mb-4">User Information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-lg-6">
                                    <base-input alternative="" label="First name" placeholder="First name" input-classes="form-control-alternative" v-model:value="model.firstName" />
                                </div>
                                <div class="col-lg-6">
                                    <base-input alternative="" label="Last name" placeholder="Last name" input-classes="form-control-alternative" v-model:value="model.lastName" />
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <!-- Address -->
                        <h6 class="heading-small text-muted mb-4">Contact Information</h6>
                        <div class="pl-lg-4">
                            <div class="row">
                                <div class="col-md-12">
                                    <base-input alternative="" label="Email Address" placeholder="Email Address" input-classes="form-control-alternative" v-model:value="model.email" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-12">
                                    <base-input alternative="" label="Phone Number" placeholder="Phone Number" input-classes="form-control-alternative" v-model:value="model.phone" />
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </form>
            <form class="col-xl-5 order-xl-1" @submit.prevent="validatePassword">
                <card shadow type="secondary">
                    <template v-slot:header>
                        <div class="bg-white border-0">
                            <div class="row align-items-center">
                                <div class="col-8">
                                    <h3 class="mb-0">Update Password</h3>
                                </div>
                                <modal v-model:show="showPasswordConfirmationModal" gradient="dark" modal-classes="modal-danger modal-dialog-centered">
                                    <template v-slot:header>
                                        <h6 class="modal-title text-danger" id="modal-title-notification">
                                            Caution...
                                        </h6>
                                    </template>
                                    <div class="py-3 text-center">
                                        <i class="ni ni-bell-55 ni-3x"></i>
                                        <h2 class="heading-section mt-4 text-default">Are you sure you want to Change your password?</h2>
                                    </div>

                                    <template v-slot:footer>
                                        <base-button type="white" text-color="info" @click="showPasswordConfirmationModal = false">
                                            Close
                                        </base-button>
                                        <base-button type="white" class="ml-auto text-success" @click="changePassword">
                                            Yes, I'm sure!
                                        </base-button>
                                    </template>
                                </modal>
                                <div class="col-4 text-right">
                                    <base-button native-type="submit" v-model:loading="passwordLoading" class="btn btn-sm btn-default">Save</base-button>
                                </div>
                            </div>
                        </div>
                    </template>
                    <div>
                        <div class="pl-lg-4">
                            <form-message v-model:type="passwordMessageType" v-model:message="passwordMessage"></form-message>
                            <div class="row">
                                <div class="col-lg-12 mb-3">
                                </div>
                                <div class="col-lg-12">
                                    <base-input alternative="" :required="true" label="Current Password" type="password" placeholder="Enter your current password" input-classes="form-control-alternative" v-model:value="passwordModel.oldPassword" />
                                </div>
                                <div class="col-lg-6">
                                    <base-input alternative="" :required="true" min-length="8" type="password" label="New Password" placeholder="Enter New Password" input-classes="form-control-alternative" v-model:value="passwordModel.newPassword" />
                                </div>
                                <div class="col-lg-6">
                                    <base-input alternative="" :required="true" min-length="8" type="password" label="Confirm Password" placeholder="Confirm Password" input-classes="form-control-alternative" v-model:value="passwordModel.confirmPassword" />
                                </div>
                                <div class="col-12 text-muted font-italic mb--2" v-if="passwordModel.newPassword != ''">
                                    <small>Password Strength:
                                        <span class="font-weight-700" :class="
                                            passwordTest.id < 2
                                              ? 'text-danger'
                                              : passwordTest.id == 2
                                              ? 'text-info'
                                              : 'text-success'
                                          ">
                                            {{ passwordTest.value }}
                                        </span>
                                    </small>
                                </div>

                                <div class="col-12 text-muted font-italic mt--3" v-show="
                                    passwordModel.confirmPassword != '' &&
                                    passwordModel.newPassword != passwordModel.confirmPassword
                                  ">
                                    <br />
                                    <small>
                                        <span class="text-danger font-weight-700">
                                            Password does not match!
                                        </span></small>
                                </div>
                            </div>
                        </div>
                    </div>
                </card>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import {
    passwordStrength
} from "check-password-strength";
import UserService from "../api/services/user.service";
import FormMessage from "../components/FormMessage.vue"
import BaseButton from '../components/BaseButton.vue';

export default {
    name: "user-profile",
    components: {
        FormMessage,
        BaseButton,
    },
    data() {
        return {
            model: {},
            contactModel: {},
            passwordModel: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
            },
            loading: null,
            passwordLoading: null,
            message: "",
            messageType: "",
            passwordMessage: "",
            passwordMessageType: "",
            showPasswordConfirmationModal: false,

        };
    },
    computed: {
        passwordTest() {
            return passwordStrength(this.passwordModel.newPassword);
        },
    },
    methods: {
        saveProfile() {
          this.loading = true;
            UserService.saveProfile(this.model).then((response) => {
                this.message = response.data.message;
                this.messageType = "success";
            }).catch((error) => {

                this.messageType = "danger";
                this.message = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message;;
            }).finally(() => {
              this.loading = false;
            });
        },
        validatePassword() {

            this.passwordMessageType = "danger";
            if (this.passwordModel.oldPassword.length < 8) {
                this.passwordMessage = "Old password is less than 8";
            } else if (this.passwordModel.newPassword.length < 8) {
                this.passwordMessage = "New password is not long enough";
            } else if (this.passwordTest.id < 1) {
                this.passwordMessage = "New password is too weak";
            } else if (this.passwordModel.newPassword != this.passwordModel.confirmPassword) {
                this.passwordMessage = "Passwords do not match";
            } else {
                this.showPasswordConfirmationModal = true;
            }
        },
        changePassword() {

            this.showPasswordConfirmationModal = false;
            this.passwordLoading = true;

            UserService.changePassword(this.passwordModel).then((response) => {
                if (response.data.isSuccess) {
                    this.passwordModel.password = this.newPassword;

                    this.passwordMessageType = "success";
                    this.passwordMessage = response.data.message;

                    this.passwordModel.newPassword = "";
                    this.passwordModel.confirmPassword = "";
                } else {
                    this.passwordMessageType = "danger";
                    this.passwordMessage = response.data.message;
                }
            }).catch((error) => {
                this.passwordMessageType = "danger";
                this.passwordMessage = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message;
            }).finally(() => {

                this.passwordLoading = null;
            });
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
