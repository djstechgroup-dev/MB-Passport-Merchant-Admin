<template>
    <main>
        
        <div class="d-flex justify-content-center p-4" >
            
            <router-link to="editlocation">
                <div class="button-list-item button-list-item-active">
                    Business 1
                </div>
            </router-link>
            

            <div class="button-list-item">
                Business 2
            </div>

        </div>    
    
        <table class="table table-bordered" style="border: 2px solid;">
            <tbody class="text-center" style="border: 2px solid;">
                <tr>
                <td colspan="2" style="background-color: #0D47AA" class="text-center text-white"><h2>Deal Information</h2></td>
                <td class="text-center"><h2>Deal Preview</h2></td>
                </tr>
                <tr>
                <td><h4>Tagline</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /></td>
                <td rowspan="7" class="text-center p-3">
                    <div class="card" style="width: 100%; border-radius: 20px;">
                        <h1 class=" py-5 text-center">Photo</h1>
                        <div class="form-check text-center">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="flexCheckDefault">
                                Use Business Photo
                            </label>
                        </div>
                    </div>
                </td>
                </tr>
                <tr>
                <td><h4>Location</h4></td>
                <td>
                    <div class="btn-group dropdown">
                    <button class="btn" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black">
                        Click all that apply
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
                </div>
                </td>
                </tr>
                <tr>
                <td><h4>Active Dates</h4></td>
                <td class="d-flex">                    
                    <!-- <div class="input-group date" id="datepicker">
                        <input type="text" id="date" style="width:100%; height: 100%; border:none" placeholder="" />
                        <span class="input-group-append">
                        </span>
                        to
                    </div> -->
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /> <p class="px-3">to</p>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" />

                </td>
                </tr>
                <tr>
                <td><h4>Number of Offers</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" />
                </td>
                </tr>
                <tr>
                <td><h4>Estimated Savings</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /></td>
                </tr>
                <tr>
                <td><h4>KPI</h4></td>
                <td>
                <div class="btn-group dropdown">
                    <button class="btn" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black">
                        Redemption Rate
                    </button>
                    <button type="button" class="btn dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent"
                    style="background-color:transparent; color: black">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenu2" style="background-color: #0D47AA;">
                        <li><button class="dropdown-item text-white" type="button">KPI #2</button></li>
                        <li><button class="dropdown-item text-white" type="button">KPI #3</button></li>
                    </ul>
                </div>
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
                <td colspan="2" style="background-color: #C3F9D1" class="text-center"><router-link to="individualpage"><h2>Save</h2></router-link></td>
                </tr>
            </tbody>
        </table>
    </main>
</template>

<style>
    .button-list-item {
        padding: 2px 20px; 
        border: 1px solid #000; 
        border-radius: 5px;
    }

    .button-list-item:not(last) {
        margin-right: 60px;
    }

    .button-list-item-active {
        background-color: rgb(13, 71, 170);
        color: #fff
    }
</style>