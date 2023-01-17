<template>
<main>
<section class="flex flex-col h-screen bg-yellow-200 pt-10 pb-20"
>
<div class="grid grid-cols-12">
<div class="col-start-1 col-span-1 border border-blue-700"> Column 1</div>
<div class="col-start-2 col-span-5 border border-blue-700 flex flex-col"><the-headline />
</div>
<div class="col-start-7 col-span-5 border border-blue-700">Column 5</div>
<div class="col-start-12 col-span-1 border border-blue-700"></div>
</div>
</section>
</main>
</template>
<script>
import TheHeadline from "./TheHeadline.vue";
export default {
	name: "TheHero",
	data() {
		return{
			renderText: "Build",
		}
	},
	components: {
		TheHeadline
	}
	
}
</script>
