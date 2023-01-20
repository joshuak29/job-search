<template>
	<main class="flex-auto bg-brand-gray-2 p-8">
		<ol>
		<job-listing v-for="listing in jobs" :key="listing.id" :data="listing"/>
		</ol>
	</main>
</template>
<script>
import axios from "axios";
import JobListing from "@/components/jobs/JobListing.vue";
export default {
	name: "JobListings",
	components: {
		JobListing,
	},
	async mounted() {
		let data = await axios.get("http://127.0.0.1:3000/jobs");
		this.jobs = data.data;
	},
	data() {
		return{
			jobs: [],
		}
	}
}
</script>