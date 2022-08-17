<template>
    <Business />
</template>

<script>

    import { useBusinessStore } from '../store/business'

    export default {
        setup() {
            const businessStore = useBusinessStore()

            const getBusiness = async () => {
                await businessStore.getBusiness()
            }

            getBusiness()
        }
    }
</script>