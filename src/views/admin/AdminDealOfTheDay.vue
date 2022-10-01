<template>
	<main class="">
		<section class="row d-flex">
			<div class="col-md d-flex justify-content-center align-items-start">
                <div>
                <h1>Deal Of the Day</h1>
                    <p><u>Select day to view / edit</u></p>

                    <div class="_datepicker">
                        <Datepicker inline autoApply />
                    </div>
                    
                </div>
			</div>
			<div class="col-md d-flex justify-content-center align-items-center py-5">
                <div>
                <div class="card card-sm card-body" style="width: 18rem;">
                    <p>
                        Select date
                        Search for and select the desired business from the dropdown menu
                        Select a deal for promotion.
                    </p>
                </div>
                <form class="form-group pt-md-5 d-flex justify-content-center align-items-center">
                    <div class="text-end">
                        <div class="m-auto">
                            <label for="Student">Business:</label>
                            <input 
                                type="text"
                                placeholder="The Albama Theatre" 
                                class="form-control-pass mx-3"/>
                        </div>
                        <div class=" d-flex justify-content-center align-items-center py-5">
                            <label for="Student">Deal: </label>
                            <textarea name="" 
                            class="form-control-pass"
                            placeholder="Kids under 7 get free admission with purchase of an adult ticket" 
                            id="" cols="20" rows="5"></textarea>
                        </div>
                    </div>
                </form>
                <div class="d-flex justify-content-around align-items-center">
                <div class="col">
                        <img src="../../assets/deal.png" style="width: 25%;" alt="edit"/>
                        <p>Edit deal</p>
                </div>
                 <div class="col">
                        <img src="../../assets/business.png" style="width: 25%;" alt="edit"/>
                        <p>Edit business</p>
                </div>  <div class="col">
                        <img src="../../assets/delete.png" style="width: 25%;" alt="edit"/>
                        <p>Delete</p>
                </div>
                </div>
                </div>
			</div>
		</section>
	</main>
</template>

<script>
import { ref } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'

export default {
    components: {
        Datepicker
    },
    setup() {
        return {}
    }
}
</script>

<style >
/* ._datepicker {
    border: 1px solid rgb(53, 53, 53);
} */
</style>