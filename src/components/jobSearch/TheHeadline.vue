<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="renderTextClasses">{{ text }}</span
      ><br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at Kigali Careers</h2>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import NextText from "@/utils/NextText";

const text = ref("Build");
let interval = ref<ReturnType<typeof setInterval>>(); //this <ReturnType<typeof setInterval>> eans that the type of setInterval be set as the type

const changeText = () => {
  interval.value = setInterval(() => {
    const texts = ["Build", "Code", "Design", "Create"];
    text.value = NextText(texts, text.value);
  }, 3000);
};
onMounted(changeText);

const clearSetInterval = () => {
  clearInterval(interval.value);
};
onUnmounted(clearSetInterval);

const renderTextClasses = computed(() => {
  return {
    [text.value.toLowerCase()]: true,
  };
});
</script>
<style scoped>
.build {
  color: #1a73e8;
}
.code {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.create {
  color: #d93025;
}
.renderText {
  overflow: hidden;
  max-height: 100px;
  max-width: 300px;
  display: block;
}
</style>
