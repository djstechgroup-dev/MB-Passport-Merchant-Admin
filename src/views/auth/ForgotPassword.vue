<template>
	<main class="main d-flex justify-content-around align-items-center">
		<section class="row d-flex justify-content-around align-items-center">
			<div class="col-md-8 m-auto">
				<div class="">
				<div>
					<h2 class="heading-login">Forgot Your Password</h2>
					<p class="para-login">Enter your email below and we will send you a link to create a new password.</p>
				</div>
				
					<div>
						<input 
							type="email" 
							class="form-control my-3"
							placeholder="Email address"
							v-model="email" />
						</div>
						<button class="btn btn-large col-12" type="submit" @click="resetPassword">
							<h2 class="mb-0">Send Link</h2>
						</button>
				</div>
			</div>
			<div class="col-md-4">
				<img src="@/assets/blueMBlogo.jpeg" alt="Paris" class="m-auto">
			</div>

		</section>
	</main>
</template>

<script>
	import {ref} from 'vue'
	import { getAuth, sendPasswordResetEmail } from "firebase/auth";

	export default {
		setup() {

			const auth = getAuth()
			const email = ref('')

			const resetPassword = async () => {
				const res = await sendPasswordResetEmail(auth, email.value)
				console.log(res)
			}

			return {
				email,
				resetPassword
			}
		}
	}
</script>

<style>
.main {
	height: 100vh;
}
.heading-login{
	color: #0D47AA;
}
.para-login {
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
.hr-login{
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