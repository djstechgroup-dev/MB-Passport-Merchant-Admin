<template>
    <div class="mx-2">
        <div class="d-flex justify-content-around align-items-end my-2 w-100">
            
            <div >{{location.name}}</div>

            <div>
                <router-link 
                    :to="{
                    name: 'merchant-edit-business-location',
                    params: {
                        id: location._id
                    }
                    }"
                >
                    <img src="@/assets/edit.png" alt="edit" class="btn-icon">
                </router-link>

                <img 
                src="@/assets/delete.png" 
                alt="delete" 
                class="btn-icon"
                @click="handleDelete(location._id)">
                
            </div>
        </div>
                    
        <div class="card p-3" style="width: 19rem; height: 320px; border-color: black;">
                            
            <img
            v-if="location.imageUrl"
            class="img-thumbnail" 
            alt="business photo" 
            :src="location.imageUrl" 
            >

            <div v-else class="card py-4 text-center" style="height: 160px">
                <h3>No Photo</h3>
            </div>

            <div class="card-body overflow-auto" style="max-height: 250px; font-size: 15px;">
                <p class="mb-1"><b>Address:</b> {{location.address}}</p>
                <p class="mb-1"><b>Hours:</b> {{getLocationTime}}</p>
                <p class="mb-1"><b>Deals Applied:</b> {{location.deals.length}}</p>
            </div>
        </div>
    </div>

</template>

<script>

    import {computed} from 'vue'

    export default {
        
        props: ['location', 'handleDelete'],

        setup({location, handleDelete}) {

            const getLocationTime = computed(() => {

                let from = new Date()
                let to = new Date()

                const openingDay = location.openingTime.day
                const openingTime = location.openingTime.time
                const closingTime = location.closingTime.time
                const closingDay = location.closingTime.day

                from.setHours(openingTime.hours, openingTime.minutes, openingTime.seconds)
                to.setHours(closingTime.hours, closingTime.minutes, closingTime.seconds)

                let openingMeridiem = (openingTime.hours >= 1 && openingTime.hours <= 12) ? 'am' : 'pm'
                let closingMeridiem = (closingTime.hours >= 1 && closingTime.hours <= 12) ? 'am' : 'pm'

                const _opening = from.getHours()
                const _closing = to.getHours()

                let opening = (_opening > 12) ? _opening - 12 : _opening
                let closing = (_closing > 12) ? _closing - 12 : _closing

                return `${openingDay} ${opening}${openingMeridiem} to ${closingDay} ${closing}${closingMeridiem}`
            })

            return {
                location,
                getLocationTime,
                handleDelete
            }
        }
    }
</script>