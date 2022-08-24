<template>
    <main>

        <h1 class="py-3 text-center">{{formData.businessName}}</h1>    
        <table class="table table-bordered" style="border: 2px solid;">
            <tbody class="text-center" style="border: 2px solid;">
                <tr>
                    <td colspan="2" style="background-color: #0D47AA" class="text-center text-white"><h2>Business Information</h2></td>
                    <td class="text-center" style="width: 350px"><h2>Preview</h2></td>
                </tr>

                <tr>
                    <td><h4>Business Name</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.businessName" />
                    </td>
                    <td rowspan="7" class="text-center p-3">
                        <!-- <div class="card cover-photo-card"> -->
                            <img
                            class="img-thumbnail" 
                            :src="filePreview" 
                            alt="business photo" 
                            >
                        <!-- </div> -->
                    </td>
                </tr>

                <tr>
                    <td><h4>Address</h4></td>
                    <td>
                        <input type="text" class="input" v-model="formData.address" />
                    </td>
                </tr>

                <tr>
                    <td><h4>Operating Hours</h4></td>
                    <td style="width: 600px">                    
                        <div class="timerangepicker">
                            <Datepicker v-model="formData.openingTime" timePicker />
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
                        <!-- <button class="btn-upload">
                            <p class="mb-0">Upload Image</p>
                        </button> -->
                        <input 
                        class="input" 
                        type="file"
                        @change="onChange">
                    </td>
                </tr>

                <tr>
                    <td colspan="2" class="p-0">
                        <button @click="addBusiness" class="btn-save">
                           SAVE 
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
import {ref} from 'vue'
import {useBusinessStore} from './../store/business'
import useStorage from './../composables/useStorage'

export default {
    setup() {
        const businessStore = useBusinessStore()
        const { 
            uploadBusinessPhoto,
            filePath,
            url,
            error
        } = useStorage()

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

        const file = ref(null)
        const filePreview = ref('')
        const fileError = ref(null)

        const addBusiness = async () => {
            await uploadBusinessPhoto(file.value)
            businessStore.addBusiness({
                ...formData.value,
                imageUrl: url.value,
                imagePath: filePath.value
            })
        }

        const types = ['image/png', 'image/jpeg']

        const onChange = e => {
            const selected = e.target.files[0]

            if(selected && types.includes(selected.type)) {

                const reader = new FileReader()

                reader.onload = event => {
                    filePreview.value = event.target.result
                }

                reader.readAsDataURL(selected)

                file.value = selected
                fileError.value = null
            } else {
                file.value = null
            }
        }

        return {
            formData,
            addBusiness,
            onChange,
            filePreview
        }
    }
}

</script>

<style>
.input {
    width:100%; 
    padding: 10px;
}

.btn-save {
    border: none;
    outline: none;
    background-color: #C3F9D1;
    text-align: center;
    cursor: pointer;
    padding: 10px;
    width: 100%;
}

.btn-save:hover {
    background-color: #82ffa3;
}

.btn-upload {
    border: none;
    outline: none;
    background-color: #C3F9D1;
    text-align: center;
    cursor: pointer;
    padding: 10px;
    width: 100%;
}

.btn-upload:hover {
    background-color: #82ffa3;
}

.timerangepicker {
    display: flex; 
    justify-content: space-between; 
    align-items: baseline;
}

.cover-photo-card {
    border-radius: 5px;
    width: 100%;
    height: 160px;
}

.cover-photo-img {
    width: 100%;
    height: 100%;
}

</style>