<template>
    <Suspense>
        <template #default>
            <Business />
        </template>

        <template #fallback>
            <div>Loading....</div>
        </template>
    </Suspense>
</template>

<script setup>
import Business from './../components/Business.vue'
</script>
