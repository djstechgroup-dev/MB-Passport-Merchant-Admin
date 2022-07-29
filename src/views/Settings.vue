<template>
  <div class="pb-5">
    <div class="m-auto text-center">
        <img src="../assets/settings.png" alt="Paris" class="m-auto">
        <h4 class="pt-3">Settings</h4>
        <hr class="hr-login col-4 m-auto"/>
    </div>
  </div>
  <div class="row">
    <div class="col-md text-center">
        <h5>Accont Information</h5>
        <hr class="hr-login"/>
        <div>
            <p>Name: Cooper Moelchert</p>
            <p>Email: cooper@strange-ventures.com</p>
            <p>Phone#: (999)999-9999</p>
            
        </div>
    </div>
    <div class="col-md text-end">				
        <form class="form-group m-auto">
            <div class=" text-end">
                <div class="form-group py-1">
                    <label for="Student">Enter Old Password:</label>
                    <input 
                        type="password" 
                        class="form-control-pass mx-3"/>
                </div>
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
            <div class="text-end">
                <router-link to="/forgot-password"><p>I forgot my password</p></router-link>
                <button class="btn mx-3 col-4 shadow" type="submit" 
                style="background-color: #C3F9D1; color: black; border-radius: 20px;">
                    <p style="margin-bottom: 0;">Save</p>
                </button>
            </div>

        </form>
    </div>
  </div>
  <div class="d-flex justify-content-center align-items-center">
    <div class="text-center">
        <h4>Regulatory Information</h4>
        <hr class="hr-login" />
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
    </div>
  </div>
</template>

<style>
.card-bg{
	background-color: #0D47AA;
  color: white;
  border-radius: 10px;
}
.border-nav{
  border-bottom: 5px solid black;
}
.border-bar{
  border-bottom: 3px solid black;
}
.border-ver{
  border-right: 5px solid black;
  padding: 0;
}
.hr-login{
	padding: 2px ;
	background-color: black !important;
}
.form-control-pass{
	border-radius: 10px !important;
	border: black solid;
}
</style>