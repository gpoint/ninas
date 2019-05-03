<template>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				
				<form class="login100-form validate-form js-tilt" data-tilt @submit.prevent="login">
					<img src="" alt="">
					<span class="login100-form-title">
						Member Login
					</span>

					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" v-model="email" placeholder="Email or Username" @input="validate_email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div v-if="error!=''" class="wrap-input100">
						<input class="input100" type="text" v-model="error" placeholder="Email or Username">
						<!-- <span class="focus-input100">{{error}}</span> -->
						<span class="symbol-input100">
						</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" v-model="password" placeholder="Password" @input="validate_password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit ">
							Login
						</button>
					</div>

					<div class="text-center p-t-12">
						<span class="txt1">
							Forgot
						</span>
						<a class="txt2" @click="forgot_password">
							Username / Password?
						</a>
					</div>
					<br/>
				</form>

				<div class="login100-pic js-tilt" data-tilt>
					<img src="" alt="">

							{{jax}}
					<div class="text-center p-t-136">
						
						<router-link class="txt2" to="/register">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</router-link>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<style scoped>
		
	.limiter{
		position: absolute;
		z-index: 9000;

	}

	@import "../assets/login/vendor/css-hamburgers/hamburgers.min.css";
	@import "../assets/login/vendor/select2/select2.min.css";
	@import "../assets/login/css/util.css";
	@import "../assets/login/css/main.css";

</style>
<script>

export default {
  name: 'login',
  
  data() {
  	return {
  		email: 'pop',
  		password: '',
  		error: '',
  		jax: ''
  	}
  },
  
  computed: {
  	
  	api() {
  		return this.$store.state.api;
  	}
  },
  
  methods: {
  	
  	forgot_password() {
  		var email = this.email;
  		this.$router.push({
  			name: 'forgot-password',
  			params: {
  				email: email
  			}
  		});
  	},

  	login() {

  		// alert(window.location.hostname)

  		if(this.error != ''){
  			return;
  		}

  		var data = {
			email: this.email,
			username: this.email,
			password: this.password
		};
  		
		this.axios.post((this.api + "/user/auth"), data)

		.then((XObj) => {
			if(XObj.data.success == true){
				this.$router.push({
					name: 'home',
					params: XObj.data
				})
			}
		})

		.catch((XErr) => {
			console.log(XErr);
		});
  	},

  	login_impl(data) {
  		// function (data){
  			// alert(JSON.stringify(data));
  		// }
  		this.jax = data;
  	},

  	validate_email() {
  		//
  		this.error = this.email!='' ? '' : 'Please enter an email or username';//  if email is not equal to '' then there is no error, else, error dey ooh!
  	},
  	
  	validate_password() {
  		//
  		this.error = this.password!='' ? '' : 'Please enter a password';//same thing as in email
  	},
  	
  	google_login() {
  		;
  	}
  },
  mounted() {

	require("@/assets/login/vendor/select2/select2.min.js");

	require("@/assets/login/vendor/tilt/tilt.jquery.min.js");
	
	require("@/assets/login/js/main.js");
	
  }
};
</script>
