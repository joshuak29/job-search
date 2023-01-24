import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
vi.mock("axios");

describe("jobStore", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});
	describe("state", () => {
		
		it("has initial empty jobs", () => {
			const store = useJobsStore();
			expect(store.jobs).toEqual([])
		})
		
	});
	describe("actions", () => {
		describe("fetch_jobs",  () => {
			it("makes API request and store received jobs", async () => {
				axios.get.mockResolvedValue({data: ["job 1", "job 2"]});
				const store = useJobsStore();
				await store.fetchJobs();
				expect(store.jobs).toEqual(["job 1", "job 2"])
			})
		})
	})
	
})	
