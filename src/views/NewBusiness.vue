<template>
    <main>

        <h1 class="py-3 text-center">{{formData.businessName}}</h1>    
        <table class="table table-bordered" style="border: 2px solid;">
            <tbody class="text-center" style="border: 2px solid;">
                <tr>
                <td colspan="2" style="background-color: #0D47AA" class="text-center text-white"><h2>Business Information</h2></td>
                <td class="text-center"><h2>Preview</h2></td>
                </tr>
                <tr>
                <td><h4>Business Name</h4></td>
                <td>
                    <input type="text" class="input" v-model="formData.businessName" />
                </td>
                <td rowspan="7" class="text-center p-3">
                    <div class="card" style="width: 100%; border-radius: 20px;">
                        <h1 class=" py-5 text-center">Photo</h1>
                    </div>
                </td>
                </tr>
                <tr>
                <td><h4>Address</h4></td>
                  <td>
                    <input type="text" class="input" v-model="formData.address" /></td>
                
                </tr>
                <tr>
                <td><h4>Operating Hours</h4></td>
                <td>                    
                    <!-- <div class="input-group date" id="datepicker">
                        <input type="text" id="date" style="width:100%; height: 100%; border:none" placeholder="" />
                        <span class="input-group-append">
                        </span>
                        to
                    </div> -->

                    <!-- <input type="text" class="input" v-model="formData.openHrs" />  -->
                    <div class="timerangepicker">
                        <Datepicker v-model="formData.openingTIme" timePicker />
                        TO
                        <Datepicker v-model="formData.closingTime" timePicker />  
                    </div>
                   
                </td>
                </tr>

                <tr>
                    <td><h4>Category</h4></td>
                    <td>

                        <select 
                        style="width: 100%; padding: 10px; text-align: center;" 
                        v-model="formData.category">
                            <option value="">Select Category</option>
                            <option value="category1">Business category 1</option>
                            <option value="category2">Business category 2</option>
                            <option value="category3">Business category 3</option>
                            <option value="category4">Business category 4</option>
                        </select>

                    <!-- <div class="btn-group dropdown">
                        
                    <button class="btn" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black">
                        Select all that apply
                    </button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent"
                    style="background-color:transparent; color: black">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu p-3" aria-labelledby="dropdownMenu2" style="background-color: #0D47AA; color:white">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                4750 Hwy 17 S
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                123 South St
                            </label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                321 North St
                            </label>
                        </div>
                    </ul>
                </div> -->
                </td>
                
                </tr>
                <tr>
                    <td><h4>Additional Info</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.description" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Website URL</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.websiteUrl" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Image</h4></td>
                    <td>
                        <button class="btn btn-large col-10" type="submit">
                            <p class="mb-0">Upload Image</p>
                        </button>
                    </td>
                </tr>

                <tr>
                <td colspan="2" style="background-color: #C3F9D1" class="text-center">
                    <button @click="addBusiness">SAVE</button>
                </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>

import {ref} from 'vue'
import {useBusinessStore} from './../store/business'

export default {
    setup() {
        const businessStore = useBusinessStore()

        const formData = ref({
            businessName: '',
            address: '',
            category: '',
            description: '',
            websiteUrl: '',
            openingTime: {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            },
            closingTime: {
                hours: new Date().getHours(),
                minutes: new Date().getMinutes()
            }
        })

        const addBusiness = () => {
            businessStore.addBusiness(formData.value)
        }

        return {
            formData,
            addBusiness
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
}

</style>