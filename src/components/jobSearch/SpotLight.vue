<template>
	<ul>
		<li v-for="spotLight in spotLights" :key="spotLight.id">
			<slot :img="spotLight.img" :title="spotLight.title" :description="spotLight.description"></slot>
		</li>
	</ul>
</template>
<script>
import axios from "axios";


export default {
	name: "SpotLight",
	data() {
		return {
			spotLights: [],
		};
	},
	async mounted() {
		let results = await axios.get("http://127.0.0.1:3000/spotlights");
		this.spotLights = results.data;
	},
};
</script>
