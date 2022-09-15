<template>
  <span v-if="loading"></span>
  <table v-else class="table text-center">
    <thead>
      <tr>
        <th scope="col">Deal</th>
        <th scope="col">Campaign Dates</th>
        <th scope="col">Status</th>
        <th style="width: 180px">
          <div class="d-flex justify-content-between sm-text">
            <span>Pause</span>
            <span>Update</span>
            <span>Delete</span>
          </div>
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="item in filteredDeals" :key="item.id">
        <td>{{ item.deal }}</td>
        <td>{{ item.campaign_dates }}</td>
        <td>{{ item.status }}</td>
        <td>
          <div class="d-flex justify-content-between sm-text">
            <img
              v-if="item.active"
              src="@/assets/pause.png"
              alt="delete"
              class="btn-icon"
              @click="handlePause(item.id)"
              style="height: 40px; width: 40px"
            />
            <img
              v-else
              src="@/assets/start.png"
              alt="delete"
              class="btn-icon"
              @click="handleStart(item.id)"
              style="height: 40px; width: 40px"
            />

            <router-link
              :to="{
                name: 'merchant-edit-deal',
                params: {
                  id: item.id,
                },
              }"
            >
              <img
                src="@/assets/edit.png"
                alt="edit"
                class="btn-icon"
                style="height: 40px; width: 40px"
              />
            </router-link>

            <img
              src="@/assets/delete.png"
              alt="delete"
              class="btn-icon"
              @click="handleDeleteDeal(item.id)"
              style="height: 45px; width: 50px"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import getBusinessDeals from "@/composables/getBusinessDeals";
import deleteDeal from "@/composables/deleteDeal";
import useToggleDeals from "@/composables/useToggleDeals";
import useCounter from "@/composables/useCounter";

export default {
  props: ["business"],
  setup({ business }) {
    const deals = ref([]);

    const { load, data } = getBusinessDeals(business._id);
    const { removeDeal, data: deletedDeal } = deleteDeal();
    const { startDeal, pauseDeal } = useToggleDeals();
    const { loadCounter } = useCounter();
    const loading = ref(false);

    const loadData = async () => {
      loading.value = true;
      await load();
      await loadCounter();
      deals.value = data.value;
      loading.value = false;
    };

    const handleDeleteDeal = async (id) => {
      const isConfirmed = confirm(
        "Are you sure you want to delete this business Deal?"
      );

      if (isConfirmed) {
        await removeDeal(id);

        if (deletedDeal.value.success) {
          await loadData();
          alert("Business Deal Deleted");
        }
      }
    };

    const handlePause = async (id) => {
      const isConfirmed = confirm("Pause this Deal?");

      if (isConfirmed) {
        try {
          await pauseDeal(id);
          await loadData();
        } catch (error) {
          alert(error.message);
        }
      }
      return;
    };

    const handleStart = async (id) => {
      const isConfirmed = confirm("Start this Deal?");

      if (isConfirmed) {
        try {
          await startDeal(id);
          await loadData();
        } catch (error) {
          alert(error.message);
        }
      }
      return;
    };

    watchEffect(async () => {
      loading.value = true;
      await load();
      deals.value = data.value;
      loading.value = false;
    });

    const filteredDeals = computed(() => {
      return deals.value.map((deal) => {
        const from = new Date(deal.active_from);
        const to = new Date(deal.active_to);

        const from_date = `${from.getUTCMonth()}/${from.getUTCDate()}/${from.getFullYear()}`;
        const to_date = `${to.getUTCMonth()}/${to.getUTCDate()}/${to.getFullYear()}`;

        return {
          id: deal._id,
          deal: deal.tagline,
          active: deal.active,
          status: deal.active ? "Active" : "Paused",
          campaign_dates: `${from_date} - ${to_date}`,
        };
      });
    });

    return {
      filteredDeals,
      deals,
      loading,
      handleDeleteDeal,
      handlePause,
      handleStart,
    };
  },
};
</script>