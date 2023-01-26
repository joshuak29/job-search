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
		filteredJobsByOrganizations() {
			const userStore = useUserStore();
			const filterOrganizations = userStore.selectedOrganizations;

			if (filterOrganizations.length < 1) {
				return this.jobs;
			} else {
				return this.jobs.filter((job) => {
					return filterOrganizations.includes(job.organization);
				});
			}
		},
		filteredJobsByJobTypes() {
			const userStore = useUserStore();
			const filterJobTypes = userStore.selectedJobTypes;

			if (filterJobTypes.length < 1) {
				return this.jobs;
			} else {
				return this.jobs.filter((job) => {
					return filterJobTypes.includes(job.jobType);
				});
			}
		},
		filteredJobs() {
			const userStore = useUserStore();
			const filterOrganizations = userStore.selectedOrganizations;
			const filterJobTypes = userStore.selectedJobTypes;

			if(filterOrganizations.length < 1 && filterJobTypes.length < 1) {
				return this.jobs
			} else if(filterOrganizations.length >= 1 && filterJobTypes.length < 1) {
				return this.filteredJobsByOrganizations
			} else if (filterOrganizations.length < 1 && filterJobTypes.length >= 1){
				return this.filteredJobsByJobTypes
			} else if (filterOrganizations.length >= 1 && filterJobTypes.length >= 1){
				return this.jobs.filter((job) => {
					return (
						filterOrganizations.includes(job.organization) &&
						filterJobTypes.includes(job.jobType)
					)
				})
			}
		},
	},
});
