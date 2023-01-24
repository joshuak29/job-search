<template>
	<main class="flex-auto bg-brand-gray-2 p-8">
		
		<ol ref="topList">
		<job-listing v-for="listing in paginatedJobs" :key="listing.id" :data="listing"/>
		</ol>
		<div class="mx-auto mt-8">
			<div class="flex flex-row flex-nowrap">
				<p class="flex-grow text-sm">Page {{ currentPage }}</p>
				<div class="flex gap-5 items-center justify-center">
					<router-link role="link" :to="{name: 'Jobs', query: {page: previousPage}}" v-if="previousPage" class="mx-3 text-sm font-semibold text-brand-blue-1" >Previous</router-link>
					<router-link role="link" :to="{name: 'Jobs', query: {page: nextPage}}" v-if="nextPage" class="mx-3 text-sm font-semibold text-brand-blue-1" >Next</router-link>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "pinia";

import { useJobsStore } from "@/stores/jobs"
import JobListing from "@/components/jobs/JobListing.vue";
//import getJobs from "@/utils/getJobs"
export default {
	name: "JobListings",
	components: {
		JobListing
	},
	mounted() {
		this.fetchJobs()
	},
	data() {
		return{
			pagination: 10,
		}
	},
	methods: {
		...mapActions(useJobsStore, ["fetchJobs"]),
		// async getJobs() {
			// const url = import.meta.env.VITE_BASE_URL;
			// console.log(url)
			// this.jobs = await getJobs("http://127.0.0.1:3000/jobs");
		// }
	},
	computed: {
		...mapState(useJobsStore, ["jobs"]),
		currentPage() {
			return Number.parseInt(this.$route.query.page || "1");
		},
		previousPage() {
			const previousPage = this.currentPage - 1;
			return previousPage >= 1 ? previousPage : undefined // ? stands for return and : stands for else(return) 
		},
		nextPage() {
			const nextPage = this.currentPage + 1;
			const lastPage = Math.ceil(this.jobs.length / this.pagination)
			return nextPage <= lastPage ? nextPage : undefined
		},
		paginatedJobs() {
			const page = this.currentPage;
			return this.jobs.slice((page - 1) * this.pagination, page * this.pagination);
		},
		
	}

}
</script>