<template>
  <main>
    <span v-if="loading">Loading...</span>

    <template v-else>
      <div
        class="w-100 d-flex flex-column justify-content-center align-items-center p-4"
      >
        <h3>{{ businessData.businessName }}</h3>
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
              <DealPreview
                :file-preview="filePreview"
                :deal="dealPreviewData"
              />
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
              <input
                type="number"
                class="input"
                v-model="formData.est_saving"
              />
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
                <button v-if="submitting" disabled class="btn-save">
                  LOADING...
                </button>
                <button v-else @click="handleUpdateDeal" class="btn-save">
                  SAVE
                </button>
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
    </template>
  </main>
</template>

<script>
import { ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import Datepicker from "@vuepic/vue-datepicker";
import useFormValidation from "@/composables/useFormValidation";
import useBusiness from "@/composables/useBusiness";
import useDeal from "@/composables/useDeal";
import useUpload from "@/composables/useUpload";
import useStorage from "@/composables/useStorage";
import DealPreview from "@/components/DealPreview.vue";
import useCounter from "@/composables/useCounter";

export default {
  components: {
    Datepicker,
    DealPreview,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    const { id } = route.params;
    const {
      getLocations,
      locations,
      getBusiness,
      data: businessData,
    } = useBusiness();
    const { deal, getDeal, updateDeal } = useDeal(id);
    const { isValidate, validate, alertValidationError } = useFormValidation();
    const { file, filePreview, handleChange, setFilePreview, clearFile } =
      useUpload();

    const { uploadBusinessPhoto, filePath, url } = useStorage();
    const {loadCounter} = useCounter();

    const formData = ref({
      tagline: "",
      locations: [],
      date_range: [],
      no_offers: 0,
      est_saving: 0,
      kpi: "",
      imageUrl: null,
      imagePath: null,
    });
    const loading = ref(false);
    const submitting = ref(false);
    const dealPreviewData = ref(null);

    const handleUpdateDeal = async () => {
      submitting.value = true;

      if (file.value) {
        const firestorePath = "covers/deals";
        await uploadBusinessPhoto(firestorePath, file.value);
        formData.value.imageUrl = url.value;
        formData.value.imagePath = filePath.value;
      }

      await updateDeal(formData.value);

      await loadCounter();

      submitting.value = false;
      clearFile();
      router.push({ name: "merchant-deals" });
    };

    watch(formData.value, () => {
      const { locations, date_range, imageUrl, imagePath, ...rest } =
        formData.value;

      validate(rest);
    });

    watchEffect(async () => {
      try {
        loading.value = true;

        await getDeal();

        const {
          businessId,
          tagline,
          active_from,
          active_to,
          no_offers,
          used_deals,
          est_saving,
          kpi,
          imageUrl,
          imagePath,
          locations: dealLocations,
        } = deal.value;

        await getBusiness(businessId);
        await getLocations(businessId);

        formData.value.tagline = tagline;
        formData.value.date_range = [active_from, active_to];
        formData.value.no_offers = no_offers;
        formData.value.est_saving = est_saving;
        formData.value.kpi = kpi;
        formData.value.locations = dealLocations;
        formData.value.imageUrl = imageUrl;
        formData.value.imagePath = imagePath;

        setFilePreview(imageUrl);

        dealPreviewData.value = {
          businessName: businessData.value.businessName,
          category: businessData.value.category,
          used: used_deals,
          remaining: no_offers - used_deals,
          tagline,
        };

        loading.value = false;
      } catch (error) {
        alert("Something went wrong, ", error);
      }
    });

    return {
      dealPreviewData,
      businessData,
      filePreview,
      locations,
      submitting,
      loading,
      formData,
      isValidate,
      alertValidationError,
      handleChange,
      handleUpdateDeal,
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