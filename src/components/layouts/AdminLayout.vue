<template>
  <main class="container-fluid" style="overflow: hidden">
    <div class="row border-nav">
      <div class="col-3 border-ver">
        <div class="p-3">
          <img
            src="@\assets\blueMBlogo.jpeg"
            alt="Paris"
            style="height: 50%; width: 50%"
          />
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
        <div class="col-3 border-ver" style="background-color: #ffd75b">
          <div class="border-bar pt-2">
            <router-link to="/admin"><h3>Home</h3></router-link>
          </div>
          <div class="border-bar pt-2">
            <router-link to="/admin/deals"
              ><h3>Manage All Deals</h3></router-link
            >
          </div>
          <div class="border-bar pt-2">
            <router-link to="/admin/business"
              ><h3>Manage All Business</h3></router-link
            >
          </div>

          <div class="border-bar pt-2">
            <router-link to="/admin/settings"
              ><h3>Settings</h3></router-link
            >
          </div>
          <div class="border-bar pt-2" style="height: 50px" />
          <div class="border-bar pt-2" style="height: 50px" />
          <div class="border-bar pt-2" style="height: 50px" />
          <div class="border-bar pt-2" style="height: 50px" />
          <div class="border-bar pt-2">
            <h3>Logout</h3>
          </div>
        </div>
        <div class="col-9 p-0" style="text-align: justify; padding: none !important">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style>
.main {
  height: 100vh;
}
.card-bg {
  background-color: #0d47aa;
  color: white;
  border-radius: 10px;
}
.border-nav {
  border-bottom: 5px solid black;
}
.border-bar {
  border-bottom: 3px solid black;
}
.border-ver {
  border-right: 5px solid black;
  padding: 0;
}
.hr-login {
  padding: 2px;
  background-color: black !important;
}
</style>
