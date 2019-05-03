<template>
	<div class="reg-details">
		<h1>
			{{username}}
			{{email}}
			{{pass}}
			{{cpass}}
		</h1>
	</div>
</template>
<style scoped>

.reg-details{
	position: absolute;
	z-index: 9000
}
</style>
<script>

export default {
	data() {
		return {
			username: '',
			email: '',
			pass: '',
			cpass: ''
		}
	},
	mounted() {
		this.username = this.$route.params.username
		console.log(this.$route)
	}
};
</script>
