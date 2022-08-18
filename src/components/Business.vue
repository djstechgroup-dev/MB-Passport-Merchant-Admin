<template>
    <main>
        <div class="d-flex justify-content-around align-items-center p-2">
            <router-link to="newlocation">
                <button class="btn">+ Add Location</button>
            </router-link>
            
            <h1>The Alabama Theatre</h1>
            <div>
                <router-link to="editlocation">
                    <img src="../assets/edit.png" alt="edit">
                </router-link>
                <img src="../assets/delete.png" alt="delete">
            </div>
        </div>
        <div>
            <div class="container-fluid py-2" style="overflow:scroll">
                <div class="d-flex flex-row flex-nowrap">
                    <div>
                        <div class="card p-3" style="width: 18rem;">
                            <img src="../assets/theatre.png" alt="Paris" style="width: 100%; border-radius: 20px;">
                            <div class="card-body">
                                <p class="card-text">Address: 475 Hwy 17s</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card p-3" style="width: 18rem;">
                            <img src="../assets/theatre.png" alt="Paris" style="width: 100%; border-radius: 20px;">
                            <div class="card-body">
                                <p class="card-text">Address: 475 Hwy 17s</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card p-3" style="width: 18rem;">
                            <img src="../assets/theatre.png" alt="Paris" style="width: 100%; border-radius: 20px;">
                            <div class="card-body">
                                <p class="card-text">Address: 475 Hwy 17s</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card p-3" style="width: 18rem;">
                            <img src="../assets/theatre.png" alt="Paris" style="width: 100%; border-radius: 20px;">
                            <div class="card-body">
                                <p class="card-text">Address: 475 Hwy 17s</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="card p-3" style="width: 18rem;">
                            <img src="../assets/theatre.png" alt="Paris" style="width: 100%; border-radius: 20px;">
                            <div class="card-body">
                                <p class="card-text">Address: 475 Hwy 17s</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

export default {
    data() {
        return {}
    }
}

</script>

<style>
.card-body-updated {
    min-height: 300px;
    min-width: 300px;
    margin-right: 5px;
}
</style>