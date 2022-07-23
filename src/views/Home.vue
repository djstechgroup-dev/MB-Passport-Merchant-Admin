<template>
  <main class="container-fluid" style="overflow: hidden;">
      <div class="row border-nav">
        <div class="col-3 border-ver">
          <div class="p-3">
            <img src="../assets/blueMBlogo.jpeg" alt="Paris" style="height: 80%; width: 80%;">
          </div>
        </div>
        <div class="col-9">
          <div className="row p-5">
              <div className="col-md">
                  <div className="card card-bg">
                      <div className="card-body">
                          <span class="display-1">12</span>
                          <h5 className="card-title">Deals Active</h5>
                      </div>
                  </div>
              </div>
              <div className="col-md">
                  <div className="card card-bg">
                      <div className="card-body">
                          <span class="display-1">409</span>
                          <h5 className="card-title">Deals Saved</h5>
                      </div>
                  </div>
              </div>
              <div className="col-md">
                  <div className="card card-bg">
                      <div className="card-body">
                        <span class="display-1">100</span>
                          <h5 className="card-title">Deals Used</h5>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    <div class="">
        <div class="row">
            <div class="col-3 border-ver">
              <div class="border-bar pt-2">
                <h3>Home</h3>
              </div>
              <div class="border-bar pt-2">
                <h3>New Deal</h3>
              </div>
              <div class="border-bar pt-2">
                <h3>All Deals</h3>
              </div>
              <div class="border-bar pt-2">
                <h3>Manage Business</h3>
              </div>
              <div class="border-bar pt-2">
                <h3>Settings</h3>
              </div>
              <div class="border-bar pt-2">
                <h3>Help</h3>
              </div>
            </div>
            <div class="col-9" style="text-align: justify;">
              <div class="row p-2">
              <div class="col-sm-4">
                <div class="card border-0">
                  <div class="card-body text-center">
                    <img src="../assets/add.png" alt="Paris" style="height: 50%; width: 50%;">
                    <h5 class="card-title pt-3">New Deal</h5>
                    <hr class="hr-login"/>
                    <p>Create a New Deal</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card border-0">
                  <div class="card-body text-center">
                    <img src="../assets/deal.png" alt="Paris" style="height: 50%; width: 50%;">
                    <h5 class="card-title pt-3">All Deals</h5>
                    <hr class="hr-login"/>
                    <p>Manage current deals and view your history</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card border-0">
                  <div class="card-body text-center">
                    <img src="../assets/business.png" alt="Paris" style="height: 50%; width: 50%;">
                    <h5 class="card-title pt-3">Business Info</h5>
                    <hr class="hr-login"/>
                    <p>manage business information like hours of operation</p>
                  </div>
                </div>
              </div>
            </div>

              <div class="row p-2">
              <div class="col-sm-4">
                <div class="card border-0">
                  <div class="card-body text-center">
                    <img src="../assets/settings.png" alt="Paris" style="height: 50%; width: 50%;">
                    <h5 class="card-title pt-3">Settings</h5>
                    <hr class="hr-login"/>
                    <p>Manage password, Privacy Policy, Terms of Services</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card border-0">
                  <div class="card-body text-center">
                    <img src="../assets/resources.png" alt="Paris" style="height: 50%; width: 50%;">
                    <h5 class="card-title pt-3">Chamber Resources</h5>
                    <hr class="hr-login"/>
                    <p>Resources provided by the Myrtle Beach Chamber of Commerce</p>
                  </div>
                </div>
              </div>
              <div class="col-sm-4">
                <div class="card border-0">
                  <div class="card-body text-center">
                    <img src="../assets/help.png" alt="Paris" style="height: 50%; width: 50%;">
                    <h5 class="card-title pt-3">Help</h5>
                    <hr class="hr-login"/>
                    <p>FAQ, Live Chat,Contact Information</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  </main>
</template>

<style>
.main {
	height: 100vh;
}
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
</style>