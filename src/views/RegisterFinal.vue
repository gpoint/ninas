<template>
	<div class="">
		<section class="page-top-section set-bg" :style="`background: url('${require('@/assets/img/page-top-bg.jpg')}')`">
			<div class="container text-white">
				<h2>Welcome <b>{{user.firstname + " " + user.lastname}}</b> <!-- What do you like -->.</h2>
			</div>
		</section>
		<!-- <div class="site-breadcrumb">
			<div class="container">
				<a href=""><i class="fa fa-home"></i>Home</a>
				<span><i class="fa fa-angle-right"></i>About us</span>
			</div>
		</div> -->
		<section class="feature-section spad">
			<div class="container">
				<div class="section-title text-center">
					<h3>Pick Your Interests</h3>
					<p>What type of clothing are you interested in ?</p>
				</div>
				<div class="row">
					<div class="col-lg-4 col-md-6">
						<!-- feature -->
						<div class="feature-item">
							<div class="feature-pic set-bg" :style="`background-image: url(${require('@/assets/img/feature/1.jpg')});`">
								<!-- <div class="sale-notic">Interested</div> -->

								<div v-if="interests.taa" class="rent-notic">Interested</div>

								<div class="togglebutton" :class="(interests.taa? 'sale-notic' : 'rent-notic') + ' form-check'" style="float: right">
					                <label>
					                	<input type="checkbox" v-model="interests.taa">
					                	<span class="toggle bg-success"></span>
					                </label>
					            </div>
							</div>
							<div class="feature-text">
								<div class="text-center feature-title">
									<h5>Traditional African Attire</h5>
									<p><i class="fa fa-map-marker"></i> Los Angeles, CA 90034</p>
								</div>
								<!-- <a href="#" class="room-price">$1,200,000</a> -->
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6">
						<!-- feature -->
						<div class="feature-item">
							<div class="feature-pic set-bg" :style="`background-image: url(${require('@/assets/img/feature/2.jpg')});`">

								<div v-if="interests.smaa" class="rent-notic">Interested</div>

								<div class="togglebutton" :class="(interests.smaa? 'sale-notic' : 'rent-notic') + ' form-check'" style="float: right">
					                <label>
					                	<input type="checkbox" v-model="interests.smaa">
					                	<span class="toggle bg-success"></span>
					                </label>
					            </div>
              <!-- <div class="sale-notic">INTERESTED</div> -->
							</div>
							<div class="feature-text">
								<div class="text-center feature-title">
									<h5>Slightly Modern African Attire</h5>
									<p><i class="fa fa-map-marker"></i> Beverly Hills, CA 90210</p>
								</div>
								<!-- <a href="#" class="room-price">$4,500,000</a> -->
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6">
						<!-- feature -->
						<div class="feature-item">
							<div class="feature-pic set-bg" :style="`background-image: url(${require('@/assets/img/feature/3.jpg')});`">
								
								<div v-if="interests.uaa" class="rent-notic">Interested</div>

								<div class="togglebutton" :class="(interests.uaa? 'sale-notic' : 'rent-notic') + ' form-check'" style="float: right">
					                <label>
					                	<input type="checkbox" v-model="interests.uaa">
					                	<span class="toggle bg-success"></span>
					                </label>
					            </div>
							</div>
							<div class="feature-text">
								<div class="text-center feature-title">
									<h5>Urban African Attire</h5>
									<p><i class="fa fa-map-marker"></i> Beverly Hills, CA 90210</p>
								</div>
								<!-- <a href="#" class="room-price">$2,500/month</a> -->
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6">
						<!-- feature -->
						<div class="feature-item">
							<div class="feature-pic set-bg" :style="`background-image: url(${require('@/assets/img/feature/4.jpg')});`">
								
								<div v-if="interests.ncat" class="rent-notic">Interested</div>

								<div class="togglebutton" :class="(interests.ncat? 'sale-notic' : 'rent-notic') + ' form-check'" style="float: right">
					                <label>
					                	<input type="checkbox" v-model="interests.ncat">
					                	<span class="toggle bg-success"></span>
					                </label>
					            </div>
							</div>
							<div class="feature-text">
								<div class="text-center feature-title">
									<h5>Normal Clothes With African Textiles</h5>
									<p><i class="fa fa-map-marker"></i> 28 Quaker Ridge Road, Manhasset</p>
								</div>
								<!-- <a href="#" class="room-price">$5,600,000</a> -->
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6">
						<!-- feature -->
						<div class="feature-item">
							<div class="feature-pic set-bg" :style="`background-image: url(${require('@/assets/img/feature/5.jpg')});`">
								
								<div v-if="interests.fend" class="rent-notic">Interested</div>

								<div class="togglebutton"  :class="(interests.fend? 'sale-notic' : 'rent-notic') + ' form-check'" style="float: right">
					                <label>
					                	<input type="checkbox" v-model="interests.fend">
					                	<span class="toggle bg-success"></span>
					                </label>
					            </div>
							</div>
							<div class="feature-text">
								<div class="text-center feature-title">
									<h5>Fashion Evolutions And New Designs</h5>
									<p><i class="fa fa-map-marker"></i> San Jose, CA 95133</p>
								</div>
								<!-- <a href="#" class="room-price">$1,600/month</a> -->
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-6">
						<!-- feature -->
						<div class="feature-item">
							<div class="feature-pic set-bg" :style="`background-image: url(${require('@/assets/img/feature/6.jpg')});`">
								
								<div v-if="interests.aaa" class="rent-notic">Interested</div>

								<div class="togglebutton"  :class="(interests.aaa? 'sale-notic' : 'rent-notic') + ' form-check'" style="float: right">
					                <label>
					                	<input type="checkbox" v-model="interests.aaa">
					                	<span class="toggle bg-success"></span>
					                </label>
					            </div>
							</div>
							<div class="feature-text">
								<div class="text-center feature-title">
									<h5>African Accesories And Adornments</h5>
									<p><i class="fa fa-map-marker"></i> Washington, DC 20002</p>
								</div>
								<!-- <a href="#" class="room-price">$1,600,000</a> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<br/>
			<div class="section container text-center">
				<h4>Find your style with our range of choices</h4>
				<!-- <p>Search real estate property records, houses, condos, land and more on leramiz.com®.<br>Find property info from the most comprehensive source data.</p> -->
				<a @click="save_interests()" class="site-btn">Continue</a>
			</div>
		</section>
		<!-- feature section end -->

	</div>
</template>
<style scoped>
		
</style>
<script>

export default {
	data() {
		return {
			user: {
				_id: '',
				firstname: '',
				lastname: '',
				username: '',
				phone: ''
			},
			interests: {
			},
			error: {
				severity: 0
			}
		};
	},

	computed: {

		api() {
			return this.$store.state.api;
		}
	},

	methods: {

		save_interests(){

			var data = {
				username: this.user.username,
				interests: this.interests
			};

			this.axios.post((this.api + "/user/username/"+data.username+"/interests"), data)
	  		
	  		.then((XObj) => {
	  			if(XObj.data.success == true){
	  				this.$router.push({
	  					name: 'home'
	  				})
	  			}
	  		})

	  		.catch((XErr) => {
	  			console.log(XErr);
	  		});
		},

		load_user(data) {

			this.axios.get((this.api + "/user/username/"+data.username))
	  		
	  		.then((XObj) => {
	  			this.user = XObj.data.user
	  			this.err = XObj.data.err
	  		})

	  		.catch((XErr) => {
	  			console.log(XErr);
	  		});
		}

	},
	mounted() {
		
		var data = this.$route.params;

		this.load_user(data);

		console.log(data)

		require('@/assets/js/main.js');
	}
};
</script>
