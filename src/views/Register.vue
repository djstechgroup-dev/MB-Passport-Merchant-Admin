<template>
	<main class="main d-flex justify-content-around align-items-center">
		<section class="row d-flex justify-content-around align-items-center">
			<div class="col-md-8 m-auto">
				<div class="">
				<div>
					<h2 class="heading-register">Sign up for <u>Myrtle Beach Passport</u></h2>
					<h4>Help people discover your business.</h4>
					<p class="para-register">By continuing you agree our to our terms of</p>
					<p class="para-register">service and privacy policy</p>
					<div class="py-3">
						<button class="btn btn-google shadow" @click="authStore.signInWithGoogle">
							<img src="../assets/google.png" alt="Save icon"/>
							Continue with google
						</button>
					</div>
					<div class="row">
						<div class="col">
							<hr class="hr-register" />
						</div>
						<div class="col">
							<h3>OR</h3>
						</div>
						<div class="col">
							<hr class="hr-register" />
						</div>
					</div>
					<p class="para-register">We will never share any data</p>
					<p class="para-register">with the third parties.</p>
				</div>
				<form class="form-group m-auto col-md-8" @submit.prevent="register">
					<div class="row">
						<div class="col">
						<input 
							type="text" 
							class="form-control my-3 "
							placeholder="First Name"
							v-model="registerForm.firstname" />
						</div>
						<div class="col">
						<input 
							type="text" 
							class="form-control my-3"
							placeholder="Last Name"
							v-model="registerForm.lastname" />
						</div>
					</div>
					<div>
						<input 
							type="email" 
							class="form-control my-3"
							placeholder="Email address"
							v-model="registerForm.email" />
						<input 
							type="password" 
							class="form-control my-3"
							placeholder="Password" 
							v-model="registerForm.password" />

						<input 
							type="text" 
							class="form-control my-3"
							placeholder="Business Name" 
							v-model="registerForm.businessName" />
						</div>
						<button class="btn btn-large col-12" type="submit">
							<h2 class="mb-0">Sign Up</h2>
						</button>
						<div class="py-3">
							<a href="/login">Already have an account</a>
						</div>
				</form>
				</div>
			</div>
			<div class="col-md-4">
				<img src="../assets/blueMBlogo.jpeg" alt="Paris" class="m-auto">
			</div>

		</section>
	</main>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '../store/auth';

export default {
	setup () {
		const registerForm = ref({});
		const authStore = useAuthStore();

		const register = () => {
			authStore.signUp(registerForm.value)
		}

		return {
			authStore,
			registerForm,
			register
		}
	}
}
</script>

<style>
.main {
	height: 100vh;
}
.heading-register{
	color: #0D47AA;
}
.para-register {
	margin: 0;
	padding: 0;
}
.form-control{
	border-radius: 10px !important;
	border: black solid;
}
.form-control::placeholder {
	text-align: center;
	color: black;
}
.hr-register{
	padding: 2px ;
	background-color: black !important;
}
.btn {
	background-color: #0D47AA;
	color: white;
}
.btn-google{
	background-color: transparent;
	color: black;
	border: black solid;
	border-radius: 10px;
}
.fa-google {
  background: conic-gradient(from -45deg, #ea4335 110deg, #4285f4 90deg 180deg, #34a853 180deg 270deg, #fbbc05 270deg) 73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
</style>