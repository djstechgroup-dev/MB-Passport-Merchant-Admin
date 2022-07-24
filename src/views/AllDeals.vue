<template>
    <main>
        <div class="d-flex p-3">
            <div class="px-3">
                <div class="dropdown">
                    <button class="btn btn-all dropdown-toggle px-5" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                        Actions
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="background-color: #0D47AA;">
                        <li><button class="dropdown-item text-white" type="button">Action #1</button></li>
                        <li><button class="dropdown-item text-white" type="button">Action #2</button></li>
                        <li><button class="dropdown-item text-white" type="button">Action #3</button></li>
                    </ul>
                </div>
            </div>
            <div class="btn btn-all btn-group p-none" role="group" aria-label="Basic radio toggle button group">
                Group By: 
                <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked>
                <label class="btn btn-sm btn-all btn-r mx-3 rounded btn-outline-primary" for="btnradio1">Radio 1</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off">
                <label class="btn btn-sm btn-all btn-r mx-3 rounded btn-outline-primary" for="btnradio2">Radio 2</label>

                <input type="radio" class="btn-check" name="btnradio" id="btnradio3" autocomplete="off">
                <label class="btn btn-sm btn-all btn-r mx-3 rounded btn-outline-primary" for="btnradio3">Radio 3</label>
            </div>
        </div>
        <table class="table text-center">
            <thead>
                <tr>
                <th></th>
                <th scope="col">Deal</th>
                <th scope="col">Business</th>
                <th scope="col">Status</th>
                <th scope="col">Campaign Dates</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items">
                <th scope="row" class="rect">Icon</th>
                <td>{{item.deal}}</td>
                <td>{{item.business}}</td>
                <td>{{item.status}}</td>
                <td>{{item.campaign_dates}}</td>
                <td>Edit</td>
                <td>delete</td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<script>
    export default {
        data() {
            return {
                items: [
                    { 
                        deal: '$5 OFF admission', 
                        business: 'The Alabama Theatre',
                        status: 'Active',
                        campaign_dates: '1/1/22 - 3/1/22' 
                    }, 
                    { 
                        deal: 'Bogo Burgers', 
                        business: 'Joe’s Grill on the Beach',
                        status: 'Active',
                        campaign_dates: '1/1/22 - 3/1/22' 
                    }, 
                    { 
                        deal: 'Bogo Burgers', 
                        business: 'Joe’s Grill on the Beach',
                        status: 'Active',
                        campaign_dates: '1/1/22 - 3/1/22' 
                    }, 
                    { 
                        deal: 'Bogo Burgers', 
                        business: 'Joe’s Grill on the Beach',
                        status: 'Active',
                        campaign_dates: '1/1/22 - 3/1/22' 
                    }, 
                    { 
                        deal: 'Bogo Burgers', 
                        business: 'Joe’s Grill on the Beach',
                        status: 'Active',
                        campaign_dates: '1/1/22 - 3/1/22' 
                    }, 
                    { 
                        deal: 'Bogo Burgers', 
                        business: 'Joe’s Grill on the Beach',
                        status: 'Active',
                        campaign_dates: '1/1/22 - 3/1/22' 
                    }, 
                    { 
                        deal: 'Bogo Burgers', 
                        business: 'Joe’s Grill on the Beach',
                        status: 'Active',
                        campaign_dates: '1/1/22 - 3/1/22' 
                    }, 
                ]
            }
        }
    }
</script>

<style>
.rect{
    width: 15px;
    height: 17px;
    left: 221px;
    top: 300px;
    background: #C4C4C4;
    border-radius: 3px;
    margin: 10px;
}
.btn-all {
	background-color: transparent;
	color: black;
    border: black solid;
    border-radius: 10px;
}
.btn-r{
    border: none;
}
</style>