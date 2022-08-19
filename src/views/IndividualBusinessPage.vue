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
