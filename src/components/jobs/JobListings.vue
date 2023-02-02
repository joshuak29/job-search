<template>
	<main class="flex-auto bg-brand-gray-2 p-8">
		<ol ref="topList">
			<job-listing
				v-for="listing in paginatedJobs"
				:key="listing.id"
				:data="listing"
			/>
		</ol>
		<div class="mx-auto mt-8">
			<div class="flex flex-row flex-nowrap">
				<p class="flex-grow text-sm">Page {{ currentPage }}</p>
				<div class="flex items-center justify-center gap-5">
					<router-link
						role="link"
						:to="{ name: 'Jobs', query: { page: previousPage } }"
						v-if="previousPage"
						class="mx-3 text-sm font-semibold text-brand-blue-1"
						>Previous</router-link
					>
					<router-link
						role="link"
						:to="{ name: 'Jobs', query: { page: nextPage } }"
						v-if="nextPage"
						class="mx-3 text-sm font-semibold text-brand-blue-1"
						>Next</router-link
					>
				</div>
			</div>
		</div>
	</main>
</template>
<script>
import axios from "axios";
import { mapActions, mapState } from "pinia";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

import JobListing from "@/components/jobs/JobListing.vue";
//import getJobs from "@/utils/getJobs"
export default {
	name: "JobListings",
	components: {
		JobListing,
	},
	mounted() {
		this.fetchJobs();
	},
	data() {
		return {
			pagination: 10,
		};
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
		...mapState(useJobsStore, [
			"filteredJobsByOrganizations",
			"filteredJobsByJobTypes",
			"filteredJobs",
		]),
		...mapState(useUserStore, ["selectedOrganizations"]),
		currentPage() {
			return Number.parseInt(this.$route.query.page || "1");
		},
		previousPage() {
			const previousPage = this.currentPage - 1;
			return previousPage >= 1 ? previousPage : undefined; // ? stands for return and : stands for else(return)
		},
		nextPage() {
			const nextPage = this.currentPage + 1;
			const lastPage = Math.ceil(this.filteredJobs.length / this.pagination);
			return nextPage <= lastPage ? nextPage : undefined;
		},
		paginatedJobs() {
			const page = this.currentPage;
			return this.filteredJobs.slice(
				(page - 1) * this.pagination,
				page * this.pagination
			);
		},
	},
};
</script>
