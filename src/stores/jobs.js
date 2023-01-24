import { defineStore } from "pinia";
import getJobs from "@/utils/getJobs"
export const useJobsStore = defineStore("jobs", {
	state: () => ({
		jobs: []
	}),
	actions: {
		async fetchJobs() {
			const baseUrl = import.meta.env.VITE_BAS_URL;
			
			const data = await getJobs("http://127.0.0.1:3000/jobs");
			this.jobs = data
		}
	}
})