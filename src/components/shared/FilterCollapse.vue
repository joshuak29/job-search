<template>
  <div class="border-b border-solid border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      @click="open"
      role="button"
    >
      <h3 class="text-base font-semibold">{{ title }}</h3>
      <font-awesome-icon :icon="filterCollapseIcon" />
    </div>
    <transition name="collapse">
      <div v-if="isOpen" class="mt-5 w-full">
        <slot>Unable to load!!</slot>
      </div>
    </transition>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
const isOpen = ref(false);
const open = () => {
  isOpen.value = !isOpen.value;
};

const filterCollapseIcon = computed(() => {
  return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
});
</script>
<style scoped>
</style>
