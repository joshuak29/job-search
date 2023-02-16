<template>
  <ul>
    <li v-for="spotLight in spotLights" :key="spotLight.id">
      <slot
        :img="spotLight.img"
        :title="spotLight.title"
        :description="spotLight.description"
      ></slot>
    </li>
  </ul>
</template>
<script setup lang="ts">
import axios from "axios";
import { ref, onMounted } from "vue";

interface SpotLight {
  id: number;
  img: string;
  title: string;
  description: string;
}
const spotLights = ref<SpotLight[]>([]);

const getSpotlights = async () => {
  let results = await axios.get<SpotLight[]>(
    "http://127.0.0.1:3000/spotlights"
  );
  spotLights.value = results.data;
};
onMounted(getSpotlights);
</script>
