<template>
<section class="mb-16">
	<h1 class="mb-14 text-8xl font-bold tracking-tighter">
		<span :class="renderTextClasses">{{ renderText }}</span> 
		<br />
		for everyone</h1>
	<h2 class="text-3xl font-light" >Find your next job at Kigali Careers</h2>
	</section>
</template>

<script>
import NextText from "@/utils/NextText.js";
export default {
	name: "TheHeadline",
	data() {
		return {
			renderText: "Build",
			interval: null
		}
	},
	created() {
		this.changeText()
	},
	beforeUnmount() {
		clearInterval(this.interval)
	},
	methods: {
		changeText() {
			this.interval = setInterval(() => {
				const texts = ["Build", "Code", "Design", "Create"];
				this.renderText = NextText(texts, this.renderText);
			}, 3000)
		}
	},
	computed: {
		renderTextClasses(){
			return {
				[this.renderText.toLowerCase()]: true
			}
		}
	}
}
</script>
<style scoped>
.build {
	color: #1a73e8
}
.code {
	color: #34a853
}
.design {
	color: #f9ab00
}
.create {
	color: #d93025
}
</style>