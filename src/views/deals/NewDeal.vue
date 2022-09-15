<template>
  <main>
    <span v-if="isLoading">Loading...</span>
    <div
      v-else
      class="w-100 d-flex flex-column justify-content-center align-items-center p-4"
    >
      <template v-if="data.length">
        <h3>To which business does this deal apply</h3>
        <div class="d-flex py-4" role="group" aria-label="Select Business">
          <div v-for="business in data" :key="business._id">
            <input
              type="radio"
              class="btn-check"
              autocomplete="off"
              v-model="businessId"
              :id="business._id"
              :value="business._id"
              @change="onChange"
            />

            <label class="btn-option mx-4" :for="business._id">
              {{ business.businessName }}
            </label>
          </div>
        </div>
      </template>
      <template v-else>
        <h3>No Business found</h3>
      </template>
    </div>

    <table class="table table-bordered" style="border: 2px solid">
      <tbody class="text-center" style="border: 2px solid">
        <tr>
          <td
            colspan="2"
            style="background-color: #0d47aa; width: 70%"
            class="text-center text-white"
          >
            <h2>Deal Information</h2>
          </td>

          <td class="text-center" style="width: 30%">
            <h2>Deal Preview</h2>
          </td>
        </tr>

        <tr>
          <td><h4>Tagline</h4></td>
          <td>
            <input type="text" class="input" v-model="formData.tagline" />
          </td>
          <td rowspan="7" class="text-center p-3">
            <DealPreview :file-preview="filePreview" :deal="null" />
          </td>
        </tr>

        <tr>
          <td><h4>Location</h4></td>

          <td>
            <div class="dropdown">
              <button
                class="dropdown-toggle btn-select-location"
                type="button"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Click all that apply
              </button>

              <ul
                class="dropdown-menu p-3"
                aria-labelledby="dropdownMenu2"
                style="background-color: #0d47aa; color: white; width: 100%"
              >
                <div
                  v-for="location in locations"
                  class="form-check"
                  style="border-bottom: 1px solid #fff"
                  :key="location.id"
                >
                  <input
                    class="form-check-input"
                    type="checkbox"
                    v-model="formData.locations"
                    :value="location._id"
                    :id="location._id"
                  />

                  <label class="form-check-label" :for="location._id">
                    {{ location.name }}
                  </label>
                </div>
              </ul>
            </div>
          </td>
        </tr>

        <tr>
          <td><h4>Active Dates</h4></td>
          <td style="width: 400px">
            <Datepicker
              v-model="formData.date_range"
              inputClassName="input text-center"
              :enableTimePicker="false"
              :clearable="false"
              range
            />
          </td>
        </tr>

        <tr>
          <td><h4>Number of Offers</h4></td>
          <td>
            <input type="number" class="input" v-model="formData.no_offers" />
          </td>
        </tr>

        <tr>
          <td><h4>Estimated Savings</h4></td>
          <td>
            <input type="number" class="input" v-model="formData.est_saving" />
          </td>
        </tr>

        <tr>
          <td><h4>KPI</h4></td>
          <td>
            <select
              style="width: 100%; text-align: center; border: none"
              v-model="formData.kpi"
            >
              <option value="">Redemption Rate</option>
              <option value="kpi#1">KPI #1</option>
              <option value="kpi#2">KPI #2</option>
              <option value="kpi#3">KPI #3</option>
            </select>
          </td>
        </tr>

        <tr>
          <td><h4>Image</h4></td>
          <td>
            <input class="input" type="file" @change="handleChange" />
          </td>
        </tr>

        <tr>
          <td colspan="2" class="p-0">
            <template v-if="isValidate">
              <button v-if="loading" disabled class="btn-save">
                LOADING...
              </button>
              <button v-else @click="createDeal" class="btn-save">SAVE</button>
            </template>
            <template v-else>
              <button class="btn-save" @click="alertValidationError">
                SAVE
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { ref, watch, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Datepicker from "@vuepic/vue-datepicker";
import getMerchantBusiness from "@/composables/getMerchantBusiness";
import useBusiness from "@/composables/useBusiness";
import useFormValidation from "@/composables/useFormValidation";
import useUpload from "@/composables/useUpload";
import useStorage from "@/composables/useStorage";
import addDeal from "@/composables/addDeal";
import DealPreview from "@/components/DealPreview.vue";
import useCounter from "@/composables/useCounter";

export default {
  components: {
    Datepicker,
    DealPreview,
  },
  setup() {
    const router = useRouter();
    const businessId = ref(null);
    const { load: loadBusinesses, data, isLoading } = getMerchantBusiness();
    const { getLocations, locations } = useBusiness();
    const { isValidate, validate, alertValidationError } = useFormValidation();
    const { add } = addDeal();
    const { file, filePreview, handleChange, clearFile } = useUpload();

    const { uploadBusinessPhoto, filePath, url } = useStorage();
    const {loadCounter} = useCounter()

    const formData = ref({
      tagline: "",
      locations: [],
      date_range: [],
      no_offers: 0,
      est_saving: 0,
      kpi: "",
    });
    const loading = ref(false);

    const onChange = async (e) => {
      businessId.value = e.target.value;
      await getLocations(businessId.value);
    };

    const createDeal = async () => {
      loading.value = true;

      let photoUrl = null;
      let photoFilePath = null;

      if (file.value) {
        const firestorePath = "covers/deals";
        await uploadBusinessPhoto(firestorePath, file.value);
        photoUrl = url.value;
        photoFilePath = filePath.value;
      }

      await add({
        ...formData.value,
        businessId: businessId.value,
        imageUrl: photoUrl,
        imagePath: photoFilePath,
      });

      await loadCounter();

      loading.value = false;
      clearFile();
      router.push({ name: "merchant-deals" });
    };

    watch(formData.value, () => {
      const { locations, date_range, ...rest } = formData.value;

      validate(rest);
    });

    watchEffect(async () => {
      const startDate = new Date();
      const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
      formData.value.date_range = [startDate, endDate];

      await loadBusinesses();

      if (data.value.length > 0) {
        businessId.value = data.value[0]._id;
        await getLocations(businessId.value);
      }
    });

    return {
      businessId,
      filePreview,
      locations,
      data,
      isLoading,
      loading,
      onChange,
      formData,
      isValidate,
      alertValidationError,
      handleChange,
      createDeal,
    };
  },
};
</script>

<style>
.btn {
  background-color: #fff !important;
  color: #000 !important;
}

input[type="radio"]:checked + label {
  color: #fff !important;
  background-color: rgb(13, 71, 170) !important;
}

.input {
  width: 100%;
  padding: 10px;
}

.btn-save {
  border: none;
  outline: none;
  background-color: #c3f9d1;
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
  background-color: #c3f9d1;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  width: 100%;
}

.btn-upload:hover {
  background-color: #82ffa3;
}

.btn-option {
  padding: 5px 30px;
  outline: none;
  border: 2px solid #000;
  border-radius: 8px;
  cursor: pointer;
}

.btn-select-location {
  width: 100%;
  border: none;
  background-color: transparent;
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