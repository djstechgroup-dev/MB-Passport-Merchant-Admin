<template>
    <main>
        <h1 class="py-3 text-center">{{business.businessName}}</h1>    
        <table class="table table-bordered" style="border: 2px solid;">
            <tbody class="text-center" style="border: 2px solid;">
                <tr>
                    <td colspan="2" style="background-color: #0D47AA" class="text-center text-white">
                        <h2>New Location</h2>
                    </td>
                    <td class="text-center"><h2>Location Preview</h2></td>
                </tr>

                <tr>
                    <td><h4>Location Name</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.name" />
                    </td>
                    <td rowspan="7" class="text-center p-3">
                        <div class="card" style="width: 100%; border-radius: 20px;">
                            <h1 class=" py-5 text-center">Photo</h1>
                        </div>

                        <div class="form-check text-center mt-4">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="flexCheckDefault">
                                    Use Business Photo
                                </label>
                        </div>
                    </td>
                </tr>

                <tr>
                    <td><h4>Location Address</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.address" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Location Info</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.info" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Operating Hours</h4></td>
                    <td style="width: 600px;">
                        <div class="timerangepicker">
                            <Datepicker v-model="formData.openingTime" timePicker />
                            TO
                            <Datepicker v-model="formData.closingTime" timePicker />  
                        </div>
                   
                    </td>
                </tr>

                <tr>
                    <td><h4>Placeholder</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.placeholder" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Image URL</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.imageUrl" />
                    </td>
                </tr>

                
                <tr>
                    <td colspan="2" style="background-color: #C3F9D1" class="text-center">
                        <button @click="addLocation">SAVE</button>
                    </td>
                </tr>

            </tbody>
        </table>
    </main>
</template>

<script>

import {ref} from 'vue'
import {useBusinessStore} from './../store/business'

this.loadBusiness()

export default {

    data() {
        return {
            business: null
        }
    },
    async mounted() {
        const res = await businessStore.getBusiness()
        this.business = res[0]
    },

    setup() {
        const businessStore = useBusinessStore()

        const formData = ref({
            name: '',
            address: '',
            info: '',
            placeholder: '',
            imageUrl: '',
            openingTime: {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            },
            closingTime: {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            }
        })
        const addLocation =async  () => {

            businessStore.addLocation({
                ...formData.value,
                businessId: this.business._id
            })
        }

        return {
            formData,
            addLocation
        }
    }
}

</script>

<style>
.input {
    width:100%; 
    padding: 10px;
}

.timerangepicker {
    display: flex; 
    justify-content: space-between; 
    align-items: baseline;
}

</style>