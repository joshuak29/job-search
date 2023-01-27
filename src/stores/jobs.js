import { defineStore } from "pinia";
import { useUserStore } from "./user";

import getJobs from "@/utils/getJobs";

export const useJobsStore = defineStore("jobs", {
	state: () => ({
		jobs: [],
	}),
	actions: {
		async fetchJobs() {
			const baseUrl = import.meta.env.VITE_BAS_URL;

			const data = await getJobs("http://127.0.0.1:3000/jobs");
			this.jobs = data;
		},
	},
	getters: {
		uniqueOrganizations() {
			const UniqueOrganizations = new Set();
			this.jobs.forEach((job) => UniqueOrganizations.add(job.organization));
			return UniqueOrganizations;
		},
		uniqueJobTypes() {
			const UniqueJobTypes = new Set();
			this.jobs.forEach((job) => UniqueJobTypes.add(job.jobType));
			return UniqueJobTypes;
		},
		includeJobByOrganization: () => (job) => {
			const userStore = useUserStore();
			if (userStore.selectedOrganizations.length === 0) return true;
			return userStore.selectedOrganizations.includes(job.organization);
		},
		includeJobByJobType: () => (job) => {
			const userStore = useUserStore();
			if (userStore.selectedJobTypes.length === 0) return true;
			return userStore.selectedJobTypes.includes(job.jobType);
		},
		filteredJobs() {
			return this.jobs
				.filter((job) => this.includeJobByOrganization(job))
				.filter((job) => this.includeJobByJobType(job));
		},
	},
});
