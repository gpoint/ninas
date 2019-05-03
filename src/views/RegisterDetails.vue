<template>
	<div class="limiter">
		<div class="container-login100">
			<form @submit.prevent="register()" class="wrap-login100">
				<!-- <div class="login100-pic js-tilt" data-tilt>
					<img src="@/assets/login/images/img-01.png" alt="IMG">
				</div>
 -->

				<div class="login100-form validate-form">
					<span class="login100-form-title">
						You are almost done...
					</span>
<!-- 
					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Valid username is required">
						<input disabled class="input100" type="text" v-model="details.username" placeholder="Username">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div> -->

					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Valid email is required: ex@abc.xyz">
<!-- required -->
						<input readonly class="input100" type="email" @keyup="verify('email')" v-model="details.email" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 container-login100-form-btn validate-input">
<!-- required -->
						<input readonly class="input100" type="tel" v-model="details.phone" placeholder="Phone">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

<!-- 					<div class="wrap-input100 container-login100-form-btn validate-input">
						<input disabled class="input100" type="password" v-model="details.pass" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
 -->
					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Password is required">
<!-- required -->
						<input class="input100" type="password" v-model="details.pass" placeholder="Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Passwords must match">
<!-- required -->
						<input class="input100" type="password" v-model="details.cpass" placeholder="Confirm Password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							C-<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>

					<!-- -->
				</div>
				<!--  -->
				<div class="login100-form validate-form">
					<span class="login100-form-title">
						{{details.username}}
					</span>

					
					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Valid Firstname is required">
<!-- required -->
						<input class="input100" type="text" required v-model="details.firstname" placeholder="Firstname">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate="Valid Lastname is Required">
<!-- required -->
						<input class="input100" type="text" required v-model="details.lastname" placeholder="Lastname">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>

					<!--
					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Password is required">
						<select class="input100" v-model="details.gender">
							<option disabled>Gender</option>
							<option value="Male">Male</option>
							<option value="Female">Female</option>
						</select>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i v-if="details.gender == 'Female'" class="fa fa-female" aria-hidden="true"></i>
							<i v-if="details.gender == 'Male'" class="fa fa-male" aria-hidden="true"></i>
							<i v-if="details.gender == 'fm'" class="fa fa-female" aria-hidden="true"></i>|
							<i v-if="details.gender == 'fm'" class="fa fa-male" aria-hidden="true"></i>
						</span>
					</div> -->

					<div class="container-login100-form-btn">
						<button type="submit" class="login100-form-btn">
							Finish Up
						</button>
					</div>
					
					<!-- -->

				</div>
			</form>
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
	  		ready: true,
	  		details:{
		  		username: '',
		  		email: '',
		  		pass: '',
		  		cpass: '',
		  		phone: '',
		  		firstname: '',
		  		lastname: ''
		  	},
		  	error: {
		  		cpass: '',
		  		firstname: '',
		  		lastname: ''
		  	}
	  	};
	},
	computed: {
  		
  		valid_name() {

  			if(this.details.firstname != '' && this.details.lastname != ''){
  				return true;
  			}return false;
  		},

  		cpassed() {
  			
  			if(this.details.cpass != '' && this.details.pass == this.details.cpass){
  				return true;
  			}return false;
  		},

		api() {
			return this.$store.state.api;
		}
	},
	methods: {
	  	register() {

	  		var data = this.details;

	  		this.axios.post((this.api + "/user/register"), data)
	  		
	  		.then((XObj) => {
	  			this.$router.push({
		  			path: '/register/'+this.details.username,
		  			params: XObj.data
				});
	  		})

	  		.catch((XErr) => {
	  			console.log(XErr);
	  		})

		  		
	  	},

	  	go_back() {

	  	}
	},
	mounted() {
 
		require("@/assets/login/vendor/select2/select2.min.js");

		require("@/assets/login/vendor/tilt/tilt.jquery.min.js");
		
		require("@/assets/login/js/main.js");

		if(this.$route.params.details == undefined){
			this.$router.push({path: '/register'})
		}
		this.details = this.$route.params.details;
		console.log(this.$route);
		
	}
};
</script>
