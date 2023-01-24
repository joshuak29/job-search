<template>
  <main-nav />
  <router-view />
  
</template>
<script>
import MainNav from "@/components/navigation/MainNav.vue";


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
