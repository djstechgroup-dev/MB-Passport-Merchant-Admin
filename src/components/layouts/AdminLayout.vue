<template>
  <main class="container-fluid" >

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

    <div class="row">

        <div class="col-3 border-ver" style="background-color: #ffd75b">
          <Nav :routes="routes" />
        </div>

        <div 
        class="col-9 p-0" 
        style="text-align: justify; padding: none !important;;"
        >
          <router-view />
        </div>

    </div>
  </main>
</template>

<script>
import { ref, watch, watchEffect, computed } from "vue";
import useCounter from "@/composables/useCounter";
import Nav from "@/components/Nav.vue";
import router from '@/router'

export default {
  components: {
    Nav,
  },
  setup() {
    const loading = ref(false);
    const { loadCounter, deals, activeDeals, usedDeals } = useCounter();

    const routes = computed(() => {
      const adminRoutes = router.options.routes.filter(item => item.name === 'admin')[0]
      return adminRoutes.children.filter(item => item.meta.display)
    })

    watch([deals, activeDeals, usedDeals], async () => {
      loading.value = true;
      await loadCounter();
      loading.value = false;
    });

    watchEffect(async () => {
      loading.value = true;
      await loadCounter();
      loading.value = false;
    });

    return {
      deals,
      activeDeals,
      usedDeals,
      loading,
      routes
    };
  },
};
</script>

<style scoped>
main {
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
