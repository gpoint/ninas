<template>
<div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
        <div class="card bg-secondary shadow border-0">
            <div class="card-header bg-transparent pb-5">
                <div class="text-muted text-center mt-2">
                    <small>Sign in with your credentials</small>
                </div>
            </div>
            <div class="card-body px-lg-5 py-lg-5">
                <form-message v-model:type="messageType" v-model:message="message"></form-message>

                <form role="form" @submit.prevent="handleLogin()">
                    <base-input :required="true" type="text" formClasses="input-group-alternative mb-3" placeholder="Email address / Phone number" addon-left-icon="ni ni-single-02" :diasbled="loading" v-model:value="model.email">
                    </base-input>

                    <base-input :required="true" type="password" formClasses="input-group-alternative mb-3" placeholder="Password" addon-left-icon="ni ni-lock-circle-open" :disabled="loading" v-model:value="model.password">
                    </base-input>

                    <div class="text-center">
                        <base-button type="default" native-type="submit" v-model:loading="loading" class="my-4">
                            Sign in
                        </base-button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-6">
                <a href="#" class="text-light"><small>Forgot password?</small></a>
            </div>
            <div class="col-6 text-right">
                <router-link to="/register" class="text-light"><small>Create new account</small></router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import FormMessage from "../components/FormMessage.vue";

export default {
    name: "Login",
    components: {
        FormMessage,
    },
    data() {
        return {
            model: {
                email: "",
                password: "",
            },
            message: "",
            messageType: "",
            loading: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        successFn(data) {
            if (data.accessToken != null) {
                window.localStorage.setItem("user", JSON.stringify(data));
                this.$router.push("/profile");
            }
            console.log(data);
            this.loading = null;
            this.message = response.data.message;
            this.messageType = "success";
        },
        failureFn(error) {
            this.loading = null;
            this.message = error.response == undefined ? "Unable to reach Application Server" : error.response.data.message;
            this.messageType = "danger";
        },
        handleLogin() {
            this.loading = true;
            this.submitted = true;

            var obj = {
                model: this.model,
                success: this.successFn,
                failure: this.failureFn,
            };

            if (this.model.email && this.model.password) {
                this.$store.dispatch("auth/login", obj);
            }
        },
    },
};
</script>

<style></style>
