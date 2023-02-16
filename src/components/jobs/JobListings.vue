<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol ref="topList">
      <job-listing
        v-for="listing in paginatedJobs"
        :key="listing.id"
        :job="listing"
        class="hide"
      />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>
        <div class="flex items-center justify-center gap-5">
          <router-link
            role="link"
            :to="{ name: 'Jobs', query: { page: previousPage } }"
            v-if="previousPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Previous</router-link
          >
          <router-link
            role="link"
            :to="{ name: 'Jobs', query: { page: nextPage } }"
            v-if="nextPage"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
            >Next</router-link
          >
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
import { onMounted, computed, toRefs } from "vue";
import { useRoute } from "vue-router";

import { useJobsStore } from "@/stores/jobs";

import JobListing from "@/components/jobs/JobListing.vue";

const jobsStore = useJobsStore();

onMounted(jobsStore.fetchJobs);

const route = useRoute();
const currentPage = computed(() =>
  Number.parseInt((route.query.page as string) || "1")
);

const pagination: number = 10;
const paginatedJobs = computed(() =>
  jobsStore.filteredJobs.slice(
    (currentPage.value - 1) * pagination,
    currentPage.value * pagination
  )
);

const previousPage = computed(() => {
  const previousPage = currentPage.value - 1;
  return previousPage >= 1 ? previousPage : undefined;
});

const nextPage = computed(() => {
  const maxPages = Math.ceil(jobsStore.filteredJobs.length / pagination);
  const nextPage = currentPage.value + 1;
  return nextPage <= maxPages ? nextPage : undefined;
});
</script>
<style></style>
