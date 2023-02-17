<template>
  <div class="h-12 w-full shadow-gray mb-5">
    <input type="text" class="h-full w-full border rounded px-3 text-base" placeholder="Product Manager, Vue, Designer..." v-model.lazy="searchTerm">{{  addSearchTerm }}
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore(); 

const searchTerm = ref("");
const addSearchTerm = computed(() => {
  userStore.updateSearch(searchTerm.value)
});
</script>
<style></style>