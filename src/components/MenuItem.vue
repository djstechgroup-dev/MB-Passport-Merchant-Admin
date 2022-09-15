<template>
    
    <div class="col-4 my-4">

        <router-link :to="menu.path">
            <div class="card text-center border-0 px-4 menu">
                <div class="card-body" style="height: 250px">
                    <div class="border-bottom border-dark border-3 title-icon" >

                        <img v-if="menu.icon == 'resources.png'" :src="require(`@/assets/${menu.icon}`)" alt="menu.title" style="width: 200px;">
                        <img v-else :src="require(`@/assets/${menu.icon}`)" alt="menu.title" style="width: 90px;">

                        <div style="display: flex; flex: 1; align-items: flex-end;">
                            <h5 class="card-title pt-3">{{menu.title}}</h5>
                        </div>
                        
                    </div>

                    <div class="py-2" style="height: 30%">
                        <p>{{menu.subTitle}}</p>
                    </div>
                </div>
            </div>            
        </router-link>
        
    </div>
</template>

<script>
    export default {
        props: ['menu']
    }
</script>

<style scoped>

a {
    color: #000 !important;
    text-decoration: none !important;
}

.title-icon {
    display: flex; 
    flex-direction: column; 
    justify-content: center;
    align-content: center;
    align-items: center;
    height: 70%
}

</style>