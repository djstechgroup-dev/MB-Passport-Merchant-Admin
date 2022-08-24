<template>
    <main>

        <div class="empty-card" v-if="businesses.length === 0">
            <span>You have 0 Business</span>

            <router-link to="/newbusiness">
                Add Business
            </router-link>
        </div>

        <BusinessItem v-if="businesses.length > 0" v-for="business in businesses" :business="business" :key="business._id" />
    </main>
</template>

<script>
import BusinessItem from './../components/BusinessItem.vue'
import getBusiness from './../composables/getBusiness'

export default {
    components: {
       BusinessItem
    },
    setup() {

        const {businesses, error, load} = getBusiness()
        load()

        return {businesses, error}
    }
}
</script>


<style>

.empty-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border: 1px solid gray;
    border-radius: 5px;
    width: 320px;
    margin-top: 20px
}

</style>