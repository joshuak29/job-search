<template>
  <main-nav />
  <the-hero />
  
  <!-- all these would work too  & <MainNav></MainNav>, <MainNav /> & <main-nav></main-nav>-->
</template>
<script>
import MainNav from "@/components/MainNav.vue";
import TheHero from "@/components/TheHero.vue";

export default {
  name: "App",
  components: { MainNav, TheHero }, //Instead of putting the same key as the value ES6 allows to put just one input to stand for both
};
</script>
