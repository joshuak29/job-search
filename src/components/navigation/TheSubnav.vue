<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1">
    <div class="flex h-full items-center bg-white px-8">
      <div v-if="onJobTab">
        <font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
        <span
          ><span class="text-brand-green-1">{{ filteredJobs.length }}</span>
          jobs matched</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useJobsStore } from "@/stores/jobs";

import { mapState } from "pinia";

const route = useRoute();
const onJobTab = computed(() => route.name === "Jobs");

const jobsStore = useJobsStore();
const filteredJobs = computed(() => jobsStore.filteredJobs);
</script>
