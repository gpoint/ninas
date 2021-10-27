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

                    <div readonly class="mb-3 btn-outline-danger text-default btn-block p-2" v-if="registerError != ''" @click="registerError = ''" 
                        style="background: #ffc8c8 !important; font-size: 0.775rem;border-radius:5px;">
                        <i class="fa fa-times float-right my-1 text-danger bg-white" style="height:16px;width:16px;border-radius:100%;padding:1px 0 0 4px;">
                        </i>
                        {{ registerError }}
                    </div>

                    <base-input :required="true" formClasses="input-group-alternative" placeholder="Firstname" addon-left-icon="ni ni-single-02" :disabled="loading" v-model:value="model.firstname">
                    </base-input>

                    <base-input :required="true" formClasses="input-group-alternative" placeholder="Lastname" addon-left-icon="ni ni-single-02" :disabled="loading" v-model:value="model.lastname">
                    </base-input>

                    <base-input type="email" formClasses="input-group-alternative" placeholder="Email" addon-left-icon="ni ni-email-83" :disabled="loading" v-model:value="model.email">
                    </base-input>

                    <base-input :required="true" pattern="[0][7-9][0-9]{9}" formClasses="input-group-alternative" placeholder="Mobile Number" addon-left-icon="ni ni-mobile-button" :disabled="loading" v-model:value="model.phone">
                    </base-input>

                    <base-input :required="true" formClasses="input-group-alternative" placeholder="Password" type="password" addon-left-icon="ni ni-lock-circle-open" :disabled="loading" v-model:value="model.password">
                    </base-input>

                    <base-input :required="true" formClasses="input-group-alternative" placeholder="Confirm Password" type="password" addon-left-icon="ni ni-lock-circle-open" :disabled="loading" v-model:value="model.confirmPassword">
                    </base-input>

                    <div class="text-muted font-italic" v-if="model.password != ''">
                        <small>Password Strength:
                            <span class="font-weight-700" :class="passwordTest.id < 2
                                  ? 'text-danger'
                                  : passwordTest.id == 2
                                  ? 'text-info'
                                  : 'text-success'">
                                {{ passwordTest.value }}
                            </span></small>
                    </div>

                    <div class="text-muted font-italic" v-show="model.confirmPassword != '' && model.password != model.confirmPassword">
                        <small>
                            <span class="text-danger font-weight-700">
                                Passwords do not match!
                            </span></small>
                    </div>

                    <div class="row my-4">
                        <div class="col-12">
                            <base-checkbox :required="true" class="custom-control-alternative">
                                <span class="text-muted">I agree with the
                                    <a href="#" target="_blank">Privacy Policy</a></span>
                            </base-checkbox>
                        </div>
                    </div>
                    <div class="text-center">
                        <base-button :loading="loading" native-type="submit" type="default" class="my-4">
                            Create Account</base-button>
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
import {
    passwordStrength
} from "check-password-strength";

export default {
    name: "Register",
    data() {
        return {
            model: {
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
            },
            loading: false,
            successful: false,
            registerError: "",
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
            this.loading = false;
        },
        failureFn(error) {
            this.registerError = error.response != undefined ? error.response.data.message : "Unable to reach Application Server";
            this.loading = false;
        },
        handleRegister() {

            if (this.model.password != this.model.confirmPassword) {
                this.registerError = "Passwords do not match";
                return;
            }

            if (this.passwordTest.id < 1) {
                this.registerError = "Please use a Stronger Password";
                return;
            }

            this.loading = true;

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
