<template>
    <div class="d-flex justify-content-between align-items-center py-2 px-4">
        <router-link :to="'newlocation/'+business._id">
            <button class="btn">+ Add Location</button>
        </router-link>

        <h1>{{business.businessName}}</h1>

        <div>
            <router-link to="editlocation">
                <img src="../assets/edit.png" alt="edit">
            </router-link>
            <img src="../assets/delete.png" alt="delete">
        </div>
    </div>

    <div>
        <div class="container-fluid py-2" style="overflow:scroll">

            <div class="d-flex flex-column">
               <div class="d-flex flex-row flex-nowrap">

                <div v-if="business.locations.length === 0">No location for this business, please add location</div>

                <div v-for="location in business.locations" :key="location._id" class="mx-2">

                    <div class="d-flex justify-content-center align-items-end my-2 w-100">
                        <div class="mr-4">{{location.name}}</div>
                        <div>
                            <img src="../assets/edit.png" alt="edit">
                            <img src="../assets/delete.png" alt="delete">
                        </div>
                    </div>
                
                    <div class="card p-3" style="width: 18rem;">
                        
                        <img src="../assets/theatre.png" alt="Paris" style="width: 100%; border-radius: 20px;">
                        <div class="card-body overflow-auto" style="max-height: 180px">
                            <p class="mb-1">Address: {{location.address}}</p>
                            <p class="mb-1">Hours: {{location.address}}</p>
                            <p class="mb-1">Deal Applied: 1</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-4">
                <h3>Deals for this business</h3>
                    <table class="w-100">
                        <thead>
                            <tr>
                                <td class="fs-5 ">Deal</td>
                                <td class="fs-5 ">Campaign Dates</td>
                                <td class="fs-5 ">Status</td>
                            </tr>
                        </thead>

                        <tbody>
                            <tr style="border-bottom: 1px solid black;">
                                <td class="p-2">5% OFF the price of admission</td>
                                <td class="p-2">01/01/22 - 01/01/22</td>
                                <td class="p-2">Paused</td>
                            </tr>

                            <tr style="border-bottom: 1px solid black;">
                                <td class="p-2">5% OFF the price of admission</td>
                                <td class="p-2">01/01/22 - 01/01/22</td>
                                <td class="p-2">Paused</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'

export default {
    components: {},
    props: {
        business: Object
    },
    setup(props) {

        const business = props.business

        return {
            business
        }
    }
}

</script>