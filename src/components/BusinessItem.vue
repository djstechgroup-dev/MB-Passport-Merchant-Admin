<template>
  <div v-if="business">
    <div class="d-flex justify-content-between align-items-center py-2 px-4">
      <router-link
        :to="{
          name: 'merchant-new-business-location',
          params: { id: business._id },
        }"
      >
        <button class="btn">+ Add New Location</button>
      </router-link>

      <h1>{{ business.businessName }}</h1>

      <div>
        <router-link
          :to="{
            name: 'merchant-edit-business',
            params: { id: business._id },
          }"
        >
          <img src="@/assets/edit.png" alt="edit" />
        </router-link>

        <img
          src="@/assets/delete.png"
          alt="delete"
          @click="onDelete(business._id)"
        />
      </div>
    </div>

    <div>
      <div class="container-fluid py-2" style="overflow: scroll">
        <div class="d-flex flex-column">
          <div class="d-flex flex-row flex-nowrap overflow-auto">
            <div v-if="!business.locations.length">
              No location for this business, please add location
            </div>

            <template v-else>
              <LocationItem
                v-for="location in business.locations"
                :location="location"
                :handleDelete="handleDeleteLocation"
                :key="location._id"
              />
            </template>
          </div>
        </div>

        <div class="p-4">
          <span v-if="loading">Loading Deals...</span>

          <template v-else>
            <h3>Deals for this business</h3>
            <BusinessDealsTable :business="business" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import LocationItem from "@/components/LocationItem.vue";
import BusinessDealsTable from "@/components/BusinessDealsTable.vue";
import deleteLocation from "@/composables/deleteLocation";
import getBusiness from "@/composables/getBusiness";
import useCounter from "@/composables/useCounter";

export default {
  components: {
    LocationItem,
    BusinessDealsTable,
  },
  props: ["businessId", "onDelete"],

  setup({ businessId, onDelete }) {
    const loading = ref(false);
    const business = ref(null);
    const { fetchBusiness, data } = getBusiness(businessId);
    const { removeLocation, data: deletedLocation } = deleteLocation();
    const { loadCounter } = useCounter();

    const handleDeleteLocation = async (id) => {
      const isConfirmed = confirm(
        "Are you sure you want to delete this location?"
      );

      if (isConfirmed) {
        await removeLocation(id);

        if (deletedLocation.value.success) {
          await fetchBusiness();
          await loadCounter();
          business.value = data.value;
          alert("Location Deleted");
        }
      }
    };

    watchEffect(async () => {
      loading.value = true;
      await fetchBusiness();
      business.value = data.value;
      loading.value = false;
    });

    return {
      business,
      loading,
      onDelete,
      handleDeleteLocation,
    };
  },
};
</script>

<style>
.sm-text {
  font-size: 12px;
}
</style>