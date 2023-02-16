<template>
  <li class="mb-7">
    <router-link
      :to="url"
      class="
        mx-auto
        block
        rounded
        border border-solid border-brand-gray-2
        bg-white
        hover:shadow-gray
      "
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pt-5 pb-2">
        <h2 class="mb-2 text-2xl">{{ job.title }}</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span role="organization">{{ job.organization }}</span>
          </div>
          <div>
            <span
              v-for="location in job.locations"
              :key="location"
              class="ml-5"
              >{{ location }}</span
            >
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mt-1 mb-2">Qualifications</h3>
          <div>
            <ul class="list-disc pl-8">
              <li
                v-for="qualification in job.minimumQualifications"
                :key="qualification"
              >
                {{ qualification }}
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-2 text-center">
          <router-link :to="url" class="text-brand-blue-1">Expand</router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>
<script setup lang="ts">
import type { Job } from "@/utils/types";
import { computed, type PropType } from "vue";

const { job } = defineProps({
  job: {
    type: Object as PropType<Job>,
    required: true,
  },
});

const url = computed(() => `/jobs/${job.id}`);
</script>