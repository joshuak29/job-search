<template>
  <filter-collapse :title="title">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-row flex-wrap">
          <li v-for="filter in filters" :key="filter" class="h-8 w-1/2">
            <input
              :id="filter"
              type="checkbox"
              class="mr-3"
              v-model="selectedFilters"
              :value="filter"
              @change="selectFilter"
            />
            <label :for="filter">{{ filter }}</label>
          </li>
        </ul>
      </fieldset>
    </div>
  </filter-collapse>
</template>
<script setup lang="ts">
import { ref, computed, type PropType } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

import FilterCollapse from "@/components/shared/FilterCollapse.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  filters: {
    type: Set<string>,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedFilters = ref<string[]>([]);

const router = useRouter();
const selectFilter = computed(() => {
  props.action(selectedFilters.value);
  router.push({ name: "Jobs" });
});

const userStore = useUserStore();

userStore.$onAction(({ after, name }) => {
  after(() => {
    if(name === "clearFilters") {
      selectedFilters.value = []
    }
  })
});

</script>
