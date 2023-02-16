import { defineStore } from "pinia";
import { useUserStore } from "./user";
import type { Job } from "@/utils/types";

import getJobs from "@/utils/getJobs";

export interface JobsStateType {
	jobs: Job[]
}
export const useJobsStore = defineStore("jobs", {
	state: (): JobsStateType => ({
		jobs: [],
	}),
	actions: {
		async fetchJobs() {
			const baseUrl = import.meta.env.VITE_BASE_URL;

			const data = await getJobs();
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
		uniqueDegrees() {
			const UniqueDegrees = new Set();
			this.jobs.forEach((job) => UniqueDegrees.add(job.degree));
			return UniqueDegrees
		},
		includeJobByOrganization: () => (job: Job) => {
			const userStore = useUserStore();
			if (userStore.selectedOrganizations.length === 0) return true;
			return userStore.selectedOrganizations.includes(job.organization);
		},
		includeJobByJobType: () => (job: Job) => {
			const userStore = useUserStore();
			if (userStore.selectedJobTypes.length === 0) return true;
			return userStore.selectedJobTypes.includes(job.jobType);
		},
		includeJobByDegree: () => (job: Job) => {
			const userStore = useUserStore();
			if (userStore.selectedDegrees.length === 0) return true;
			return userStore.selectedDegrees.includes(job.degree)
		},
		filteredJobs(): Job[] {
			return this.jobs
				.filter((job) => this.includeJobByOrganization(job))
				.filter((job) => this.includeJobByJobType(job))
				.filter((job) => this.includeJobByDegree(job));
		},
	},
});
