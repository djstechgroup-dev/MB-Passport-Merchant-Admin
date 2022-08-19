<template>
    <Suspense>
        <template #default>
            <FormNewLocation />
        </template>
        <template #fallback>
            <div>Loading....</div>
        </template>
    </Suspense>
</template>

<script>


</script>