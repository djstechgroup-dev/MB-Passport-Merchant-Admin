<template>
    <main>
        <h1 class="py-3 text-center">Enter Business Name...</h1>    
        <table class="table table-bordered" style="border: 2px solid;">
            <tbody class="text-center" style="border: 2px solid;">
                <tr>
                <td colspan="2" style="background-color: #0D47AA" class="text-center text-white"><h2>Business Information</h2></td>
                <td class="text-center"><h2>Preview</h2></td>
                </tr>
                <tr>
                <td><h4>Business Name</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /></td>
                <td rowspan="7" class="text-center p-3">
                    <div class="card" style="width: 100%; border-radius: 20px;">
                        <h1 class=" py-5 text-center">Photo</h1>
                        
                    </div>
                </td>
                </tr>
                <tr>
                <td><h4>Address</h4></td>
                  <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /></td>
                
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
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /> 

                </td>
                </tr>
                <tr>
                <td><h4>Category</h4></td>
                
                   <td>
                    <div class="btn-group dropdown">
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
                </div>
                </td>
                
                </tr>
                <tr>
                <td><h4>Additional Info</h4></td>
                <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /></td>
                </tr>
                <tr>
                <td><h4>Website URL</h4></td>
               <td>
                    <input type="email" style="width:100%; height: 100%; border:none" placeholder="" /></td>
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
                <td colspan="2" style="background-color: #C3F9D1" class="text-center"><h2>Save</h2></td>
                </tr>
            </tbody>
        </table>
    </main>
</template>