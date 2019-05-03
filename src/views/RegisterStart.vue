<template>
	<div class="limiter">
		<div class="container-login100">
			<div class="wrap-login100">
				<div class="login100-pic js-tilt" data-tilt>
					<img src="@/assets/login/images/img-01.png" alt="IMG">
				</div>

				<form @submit.prevent="register" class="login100-form validate-form">
					<span class="login100-form-title">
						Sign Up Here...
					</span>

					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Valid username is required">
<!-- required -->		{{error.username}}
						<input class="input100" type="text" @keyup="verify('username')" v-model="username" placeholder="Username">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-user" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 container-login100-form-btn validate-input" data-validate = "Valid email is required: ex@abc.xyz">
<!-- required -->		{{error.email}}
						<input class="input100" type="email" @keyup="verify('email')" v-model="email" placeholder="Email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>

					<div class="wrap-input100 container-login100-form-btn validate-input">
<!-- required -->		{{error.phone}}
						<input class="input100" type="tel" @keyup="verify('phone')" v-model="phone" placeholder="Phone">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div v-if="there_is_no_error()" class="container-login100-form-btn">
						<button type="submit" class="login100-form-btn">
							Login
						</button>
					</div>
					
					<!-- -->

					<div class="text-center p-t-136">
						<router-link class="txt2" to="/login">
							Have An Account... ?
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</router-link>
					</div>
				</form>
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
	  		username: '',
	  		email: '',
	  		phone: '',
	  		error: {
	  			username: '',
		  		email: '',
		  		phone: ''
	  		}
	  	};
	},

	computed: {
  	
		api() {
			return this.$store.state.api;
		}
	},

	methods: {
	  	verify(name){

	  		var data = {};
			data[name] = this[name],

	  		this.axios.post((this.api + "/user/verify"), data)
	  		
	  		.then((XObj) => {
	  			if(XObj.data.exists){
					this.error[name] = `This ${name} already exists`;
				}else{
					this.error[name] = '';
				}
	  		})
	  		
	  		.catch((XErr) => {
	  			alert(XErr);
	  		});

	  	},

	  	register() {
  			this.$router.push({
	  			name: 'register-details',
	  			params: {
	  				details: {
		  				username: this.username,
				  		email: this.email,
				  		phone: this.phone,
	  				}
			  	}
		  	});
	  	},

	  	there_is_no_error(){

	  		if(this.username == '' || this.email == '' || this.phone == ''){
	  			return false;
	  		}
	  		if(this.error.username != '' || this.error.email != '' || this.error.phone != ''){
	  			return false;
	  		}

	  		return true;
	  	}
	},
	mounted() {

		require("@/assets/login/vendor/select2/select2.min.js");

		require("@/assets/login/vendor/tilt/tilt.jquery.min.js");
		
		require("@/assets/login/js/main.js");
		
	}
};
</script>
