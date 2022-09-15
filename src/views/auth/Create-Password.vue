<template>
	<main class="main d-flex justify-content-around align-items-center">
		<section class="row d-flex justify-content-around align-items-center">
			<div class="col-md-8 m-auto">
				<div class="">
				<div>
					<h2 class="heading-login">Create New Password</h2>
				</div>
        <form class="form-group col-8 m-auto">
            <div class="text-end">
                <div class="form-group py-1">
                    <label for="Student">Enter New Password:</label>
                    <input 
                        type="password" 
                        class="form-control-pass mx-3"/>
                </div>
                <div class="form-group py-1">
                    <label for="Student">Retype New Password:</label>
                    <input 
                        type="password" 
                        class="form-control-pass mx-3"/>
                </div>
            </div>
            <div class="text-justify py-3">
                <button class="btn mx-3 col-8 shadow" type="submit" 
                style="background-color: #C3F9D1; color: black; border-radius: 20px;">
                    <p style="margin-bottom: 0;">Save</p>
                </button>
            <p class="p-5">You will be directed to the log in screen after saving the new password.</p>
            </div>
        </form>
				</div>
			</div>
			<div class="col-md-4">
				<img src="@/assets/blueMBlogo.jpeg" alt="Paris" class="m-auto">
			</div>

		</section>
	</main>
</template>