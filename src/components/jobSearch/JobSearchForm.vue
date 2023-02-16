<template>
  <form
    @submit.prevent="goToJobs"
    class="flex h-12 w-full items-center rounded-3xl border border-brand-gray-3"
  >
    <font-awesome-icon :icon="['fas', 'search']" class="ml-5 mr-3" />
    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="absolute left-0 -top-10">Role</label>
        <input
          id="role"
          ref="joshua"
          v-model="role"
          type="text"
          placeholder="Software engineer"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>
      <span
        class="f-full flex items-center border-l border-r border-brand-gray-2 px-3"
        >in</span
      >
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="absolute left-0 -top-10">Where?</label>
        <input
          id="location"
          v-model="where"
          type="text"
          placeholder="Kigali"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>
    </div>
    <global-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import GlobalButton from "@/components/shared/GlobalButton.vue";

const role = ref("");
const where = ref("");

const router = useRouter();

const goToJobs = () => {
  router.push({
    name: "Jobs",
    query: { role: role.value, where: where.value },
  });
};
</script>
