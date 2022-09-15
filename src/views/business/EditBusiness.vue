<template>
    <main>

            <div v-if="getBusinessError" class="error">{{getBusinessError}}</div>
            <div v-if="error" class="error">{{error}}</div>

            <template v-if="businessData">
                <h1 class="py-3 text-center">{{formData.businessName}}</h1>    
                <table class="table table-bordered" style="border: 2px solid;">
                    <tbody class="text-center" style="border: 2px solid;">
                        <tr>
                            <td colspan="2" style="background-color: #0D47AA" class="text-center text-white"><h2>Business Information</h2></td>
                            <td class="text-center" style="width: 350px"><h2>Preview</h2></td>
                        </tr>

                        <tr>
                            <td style="width: 300px"><h4>Business Name</h4></td>
                            <td>
                                <input type="text" class="input" v-model="formData.businessName" />
                            </td>
                            <td rowspan="7" class="text-center p-3">
                                <!-- <div class="card cover-photo-card"> -->
                                    <img
                                    v-if="filePreview"
                                    class="img-thumbnail" 
                                    :src="filePreview" 
                                    alt="business photo" 
                                    >

                                    <img
                                    v-else
                                    class="img-thumbnail" 
                                    src="@/assets/default-cover.webp" 
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
                                    <TimePicker v-model="formData.openingTime"  />
                                    TO
                                    <TimePicker v-model="formData.closingTime"  />  
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
                                <input 
                                class="input" 
                                type="file"
                                @change="handleChange">
                            </td>
                        </tr>

                        <tr>
                            <td colspan="2" class="p-0">
                                
                                <button v-if="loading" disabled class="btn-save">LOADING...</button>
                                <button v-else @click="updateBusiness" class="btn-save">
                                SAVE 
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </template>
    </main>
</template>

<script>
import {ref, watch, watchEffect} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useUpload from '@/composables/useUpload'
import useStorage from '@/composables/useStorage'
import editBusiness from '@/composables/editBusiness'
import getBusiness from '@/composables/getBusiness'

import TimePicker from '../../components/TimePicker.vue'

export default {
    components: {
        TimePicker
    },
    setup() {

        const route = useRoute()
        const router = useRouter()

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
        const loading = ref(false)
        const error = ref(null)

        const {
            fetchBusiness, 
            data: businessData, 
            loading: fetchLoading, 
            error: getBusinessError
        } = getBusiness(route.params.id)

        const {
            file,
            filePreview,
            handleChange,
            setFilePreview,
            error: fileError
        } = useUpload()

        const { 
            uploadBusinessPhoto,
            filePath,
            url,
            error: uploadError
        } = useStorage()

        const {update, error: updateError} = editBusiness(route.params.id)

        const loadBusiness = async () => {
            await fetchBusiness()

            const {
                businessName,
                address,
                description,
                category,
                webSiteUrl,
                openingTime,
                closingTime,
                imageUrl
            } = businessData.value

            formData.value = {
                businessName,
                address,
                category,
                description,
                websiteUrl: webSiteUrl,
                openingTime,
                closingTime
            }

            setFilePreview(imageUrl)

            console.log(file.value)
        }

        const updateBusiness = async () => {

            loading.value = true

            if(file.value) {
                const firestorePath = `covers/business`
                await uploadBusinessPhoto(firestorePath, file.value)
                await update({
                    ...formData.value,
                    imageUrl: url.value,
                    imagePath: filePath.value
                })   
            } else {
                await update(formData.value)
            }
            
            loading.value = false
            router.push({name: 'merchant-business'})
        }

        watch(uploadError, () => {
            error.value = uploadError.value
        })

        watch(updateError, () => {
            error.value = updateError.value
        })

        watchEffect(async () => {
            loading.value = true
            await loadBusiness()
            loading.value = false
        })
        

        return {
            businessData,
            formData,
            updateBusiness,
            handleChange,
            filePreview,
            fileError,
            fetchLoading,
            loading,
            getBusinessError,
            error
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

.error {
	padding: 5px;
	border-radius: 5px;
	background-color: rgb(253, 208, 208);
	border: 2px solid rgb(255, 91, 91);
	margin-top: 10px;
    text-align: center;
}
</style>