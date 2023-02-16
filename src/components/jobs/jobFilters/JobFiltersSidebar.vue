<template>
  <div
    class="
      flex
      w-96
      flex-col
      border-r border-solid border-brand-gray-1
      bg-white
      p-4
    "
  >
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <GlobalButton text="Clear Filters" type="secondary" />
        </div>
      </div>
      <job-filters-sidebar-group
        title="Organizations"
        :action="userStore.addSelectedOrganizations"
        :filters="jobsStore.uniqueOrganizations"
      />
      <job-filters-sidebar-group
        title="Job Types"
        :action="userStore.addSelectedJobTypes"
        :filters="jobsStore.uniqueJobTypes"
      />
      <job-filters-sidebar-group
        title="Degrees"
        :action="userStore.addSelectedDegrees"
        :filters="jobsStore.uniqueDegrees"
      />
    </section>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useJobsStore } from "@/stores/jobs";

import GlobalButton from "@/components/shared/GlobalButton.vue";
import JobFiltersSidebarGroup from "@/components/jobs/jobFilters/JobFiltersSidebarGroup.vue";

const userStore = useUserStore();
const jobsStore = useJobsStore();
</script>
