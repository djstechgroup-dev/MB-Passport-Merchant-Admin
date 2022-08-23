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
                        <button @click="add">SAVE</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>      
</template>

<script>

import { useRoute } from 'vue-router'
import addLocation from './../composables/addLocation'

export default {

    setup() {

        const route = useRoute()
        const {business, formData, load, add} = addLocation(route.params.bid)

        load()

        return {
            business,
            formData,
            add
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