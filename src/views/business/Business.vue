<template>
  <main>
    <div
      v-if="!data.length"
      style="display: flex; width: 100%; justify-content: center"
    >
      <div class="empty-card">
        <span>You have no business yet</span>

        <router-link to="/new-business"> Add Business </router-link>
      </div>
    </div>

    <template v-else>
      <span v-if="loading">Loading...</span>
      <BusinessItem
        v-else
        v-for="business in data"
        :business-id="business._id"
        :key="business._id"
        :onDelete="handleDelete"
      />
    </template>
  </main>
</template>

<script>
import { ref, watchEffect } from "vue";
import BusinessItem from "@/components/BusinessItem.vue";
import getMerchantBusiness from "@/composables/getMerchantBusiness";
import deleteBusiness from "@/composables/deleteBusiness";
import useCounter from "@/composables/useCounter";

const loading = ref(false);

export default {
  components: {
    BusinessItem,
  },
  setup() {
    const { data, error, load } = getMerchantBusiness();

    const { data: deleteData, removeBusiness } = deleteBusiness();
    const {loadCounter} = useCounter()

    const handleDelete = async (id) => {
      const isConfirmed = confirm(
        "Are you sure you want to delete this business?"
      );

      if (isConfirmed) {
        await removeBusiness(id);

        if (deleteData.value.success) {
          await load();
          await loadCounter();
          alert("Business Deleted");
        }
      }
    };

    watchEffect(async () => {
      loading.value = true;
      await load();
      loading.value = false;
    });

    return { data, error, loading, handleDelete };
  },
};
</script>

<style>
.empty-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  width: 320px;
  margin-top: 20px;
}
</style>