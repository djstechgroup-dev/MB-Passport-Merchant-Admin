<template>
    <main>

        <span v-if="loading">Loading...</span>

        <template v-else>

            <h1 class="py-3 text-center">
                {{business.businessName}}
            </h1>

            <table class="table table-bordered" style="border: 2px solid;">
                <tbody class="text-center" style="border: 2px solid;">

                    <tr>
                        <td colspan="2" style="background-color: #0D47AA" class="text-center text-white">
                            <h2>Location Information</h2>
                        </td>
                        <td class="text-center">
                            <h2>Location Preview</h2>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <h4>Location Name</h4>
                        </td>
                        <td>
                            <input type="text" class="input" v-model="formData.name" />
                        </td>
                        <td rowspan="7" class="text-center p-3">
                            <img
                            v-if="filePreview"
                            class="img-thumbnail" 
                            :src="filePreview" 
                            alt="business photo" 
                            >

                            <div v-else class="no-photo">
                                <h1>Photo</h1>
                            </div>
                        </td>
                    </tr>

                    <tr>
                        <td style="width: 240px"><h4>Location Address</h4></td>
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
                        <td style="width: 450px;">
                            <div class="timerangepicker">
                                <div class="day-time-picker">
                                    <select class="day-selector" v-model="formData.openingTime.day">
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                    </select>

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.openingTime.time" />
                                </div>

                                -

                                <div class="day-time-picker">
                                    <select class="day-selector" v-model="formData.closingTime.day">
                                        <option value="Sunday">Sunday</option>
                                        <option value="Monday">Monday</option>
                                        <option value="Tuesday">Tuesday</option>
                                        <option value="Wednesday">Wednesday</option>
                                        <option value="Thursday">Thursday</option>
                                        <option value="Friday">Friday</option>
                                        <option value="Saturday">Saturday</option>
                                    </select>

                                    <TimePicker 
                                    inputClassName="dp-custom-input" 
                                    hideInputIcon 
                                    v-model="formData.closingTime.time" />
                                </div>
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
                            <button v-if="false" disabled class="btn-save">LOADING...</button>
                            <button v-else @click="updateLocation" class="btn-save">
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
import {useRoute, useRouter} from 'vue-router'

import TimePicker from '@/components/TimePicker.vue'
import getLocation from '@/composables/getLocation'
import useBusiness from '@/composables/useBusiness'
import useStorage from '@/composables/useStorage'
import useUpload from '@/composables/useUpload'
import editLocation from '@/composables/editLocation'

export default {
    components: {
        TimePicker
    },
    setup() {

        const router = useRouter()
        const route = useRoute()
        const loading = ref(false)
        const business = ref(null)

        const {data: locationData, fetchLocation} = getLocation(route.params.id)
        const {data: businessData, getBusiness} = useBusiness()
        const {update} = editLocation(route.params.id)
        const {
            file,
            filePreview,
            handleChange,
            setFilePreview
        } = useUpload()

        const { 
            uploadBusinessPhoto,
            filePath,
            url
        } = useStorage()

        const formData = ref({
            name: '',
            address: '',
            info: '',
            openingTime: {
                day: 'Sunday',
                time: {
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes(),
                    seconds: new Date().getSeconds()
                }
            },
            closingTime: {
                day: 'Saturday',
                time: {
                    hours: new Date().getHours(),
                    minutes: new Date().getMinutes(),
                    seconds: new Date().getSeconds()
                }
            },
            placeholder: '',
            imageUrl: '',
            imagePath: ''

        })

        const updateLocation = async () => {

            loading.value = true

            if(file.value) {
                const firestorePath = `covers/location`
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

        watchEffect(async () => {
            loading.value = true
            await fetchLocation()

            const {
                businessId,
                name,
                address,
                info,
                openingTime,
                closingTime,
                placeholder,
                imageUrl,
                imagePath
            } = locationData.value

            formData.value = {
                name,
                address,
                info,
                openingTime,
                closingTime,
                placeholder,
                imageUrl,
                imagePath
            }

            setFilePreview(imageUrl)

            await getBusiness(businessId)

            business.value = businessData.value

            loading.value = false
        })

        return {
            business,
            formData,
            loading,
            handleChange,
            filePreview,
            updateLocation
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

.no-photo {
    padding: 10px;
    border: 1px solid black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 180px;
}
</style>