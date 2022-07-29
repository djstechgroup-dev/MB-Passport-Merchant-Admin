<template>
    <main>
        <p class="py-3 text-center">Select the location you want to edit</p>    
        <table class="table table-bordered" style="border: 2px solid;">
            <tbody class="text-center" style="border: 2px solid;">
                <tr>
                <td colspan="2" style="background-color: #0D47AA" class="text-center text-white"><h2>Location Information</h2></td>
                <td class="text-center"><h2>Deal Preview</h2></td>
                </tr>
                <tr>
                <td><h4>Location Name</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" value="Theatre 1"/></td>
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
                <td><h4>Address</h4></td>
                <td>
               
                <input type="address" style="width:100%; height: 100%; border:none" placeholder="" value="4750 Hwy 17 S, North Myrtle Beach, SC 29582"/></td>
                </tr>
                <tr>
                <td><h4>Additional Info</h4></td>
                <td class="d-flex">
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /> 

                </td>
                </tr>
                <tr>
                <td><h4>Operating Hours</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" value="Today: 9am - 5pm "/>
                </td>
                </tr>
                <tr>
                <td><h4>Placeholder</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /></td>
                </tr>
                <tr>
                <td><h4>Deals Applied</h4></td>
                <td>
                <div class="btn-group dropdown">
                    <button class="btn" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; color: black">
                       Check all that apply
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