<template>
  <main-nav />
  <!--<the-hero /> -->
  <router-view />
  <!-- all these would work too  & <MainNav></MainNav>, <MainNav /> & <main-nav></main-nav>-->
</template>
<script>
import MainNav from "@/components/navigation/MainNav.vue";
/*import TheHero from "@/components/jobSearch/TheHero.vue"; */

export default {
  name: "App",
  components: { MainNav}, //Instead of putting the same key as the value ES6 allows to put just one input to stand for both
};
</script>
<style>
:root {
	font-family: 'Open Sans', sans-serif
}
</style>
