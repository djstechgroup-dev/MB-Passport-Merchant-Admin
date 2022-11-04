<template>
  <main>
    <div class="d-flex p-3 my-4">
      <div class="px-3">
        <select class="select-action form-control" style="border-width: 1px; border-radius: 8px;">
          <option value="">Actions</option>
          <option value="action#1">Action #1</option>
          <option value="action#2">Action #2</option>
          <option value="action#3">Action #3</option>
        </select>
      </div>

      <div class="group-btn-container">
        <span>Group By: </span>
        <div class="btn-group group-btn" role="group" aria-label="Group By">
          <input
            type="radio"
            class="btn-check"
            id="deal"
            autocomplete="off"
            value="deal"
            v-model="groupBy"
          />
          <label class="btn-item btn-outline-secondary" for="deal">Deal</label>

          <input
            type="radio"
            class="btn-check"
            id="business"
            autocomplete="off"
            value="business"
            v-model="groupBy"
          />
          <label class="btn-item btn-outline-secondary" for="business"
            >Business</label
          >

          <input
            type="radio"
            class="btn-check"
            id="date"
            autocomplete="off"
            value="date_created"
            v-model="groupBy"
          />
          <label class="btn-item btn-outline-secondary" for="date"
            >Date Created</label
          >
        </div>
      </div>
    </div>

    <div class="p-3">
      <span v-if="loading">Loading....</span>

      <table v-else class="table text-center">
        <thead>
          <tr>
            <th scope="col">Deal</th>
            <th scope="col">Business</th>
            <th scope="col">Status</th>
            <th scope="col">Campaign Dates</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredDeals" :key="item.id">
            <td>{{ item.deal }}</td>
            <td>{{ item.business }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.campaign_dates }}</td>
            <td>
              <router-link
                :to="{
                  name: 'merchant-edit-deal',
                  params: {
                    id: item.id,
                  },
                }"
              >
                <img src="@/assets/edit.png" alt="edit" class="btn-icon" />
              </router-link>

              <img
                src="@/assets/delete.png"
                alt="delete"
                class="btn-icon"
                @click="handleDelete(item.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script>
import { ref, computed, watchEffect } from "vue";
import useMerchant from "@/composables/useMerchant";
import deleteDeal from "@/composables/deleteDeal";
import useCounter from "@/composables/useCounter";

export default {
  setup() {
    const items = ref([]);
    const loading = ref(false);
    const { getAllDeals, deals } = useMerchant();
    const { removeDeal } = deleteDeal();
    const { loadCounter } = useCounter();

    const groupBy = ref("deal");

    const filteredDeals = computed(() => {
      return deals.value.map((deal) => {
        const from = new Date(deal.active_from);
        const to = new Date(deal.active_to);

        const from_date = `${from.getUTCMonth()}/${from.getUTCDate()}/${from.getFullYear()}`;
        const to_date = `${to.getUTCMonth()}/${to.getUTCDate()}/${to.getFullYear()}`;

        const d = {
          id: deal._id,
          deal: deal.tagline,
          business: deal.businessId.businessName,
          status: deal.active ? "Active" : "Inactive",
          campaign_dates: `${from_date} - ${to_date}`,
        };

        return d;
      });
    });

    const handleDelete = async (id) => {
      const isConfirmed = confirm("Are you sure?");

      if (isConfirmed) {
        await removeDeal(id);
        await getAllDeals();
        await loadCounter();
        alert("Deal successfully deleted!");
      }

      return;
    };

    watchEffect(async () => {
      loading.value = true;
      await getAllDeals();
      loading.value = false;
    });

    return {
      items,
      filteredDeals,
      groupBy,
      loading,
      deals,
      handleDelete,
    };
  },
};
</script>

<style>
.rect {
  width: 15px;
  height: 17px;
  left: 221px;
  top: 300px;
  background: #c4c4c4;
  border-radius: 3px;
  margin: 10px;
}
.btn-all {
  background-color: transparent;
  color: black;
  border: black solid;
  border-radius: 10px;
}
.btn-r {
  border: none;
}

.group-btn-container {
  border: 1px solid #000;
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 6px 10px;
}

.group-btn-container span {
  margin-right: 10px;
}

.group-btn {
  gap: 4px;
}

.btn-item {
  border-radius: 5px;
  padding: 1px 5px;
  cursor: pointer;
}

.select-action {
  border-radius: 8px;
  width: 200px;
  padding: 10px;
}
</style>