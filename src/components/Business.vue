<template>
    <main>
        <BusinessItem v-for="business in businesses" :business="business" ref="businesses" />
    </main>
</template>

<script setup>
import {ref} from 'vue'
import BusinessItem from './BusinessItem.vue'
import { useBusinessStore } from '../store/business'

const businesses = ref([])
const businessStore = useBusinessStore()

businesses.value = await businessStore.getBusiness()
            
</script>

<style>
.card-body-updated {
    min-height: 300px;
    min-width: 300px;
    margin-right: 5px;
}
</style>