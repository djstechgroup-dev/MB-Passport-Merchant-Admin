<template>
    <main>
        {{businesses}}
        <BusinessItem v-for="business in businesses" :business="business" :key="business._id" />
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
