import { createPinia, setActivePinia } from "pinia";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
vi.mock("axios");

describe("jobStore", () => {
	beforeEach(() => {
		setActivePinia(createPinia());
	});
	describe("state", () => {
		it("has initial empty jobs", () => {
			const store = useJobsStore();
			expect(store.jobs).toEqual([]);
		});
	});
	describe("actions", () => {
		describe("fetch_jobs", () => {
			it("makes API request and store received jobs", async () => {
				axios.get.mockResolvedValue({ data: ["job 1", "job 2"] });
				const store = useJobsStore();
				await store.fetchJobs();
				expect(store.jobs).toEqual(["job 1", "job 2"]);
			});
		});
	});
	describe("getters", () => {
		describe("uniqueOrganizations", () => {
			it("returns a set of unique organizations from the jobs", () => {
				const store = useJobsStore();
				store.jobs = [
					{
						organization: "Youtube",
					},
					{
						organization: "Oracle",
					},
					{
						organization: "Oracle",
					},
				];

				const result = store.uniqueOrganizations;

				expect(result).toEqual(new Set(["Youtube", "Oracle"]));
			});
		});
		describe("uniqueJobTypes", () => {
			it("returns a set of unique job types from the jobs", () => {
				const store = useJobsStore();
				store.jobs = [
					{
						jobType: "Intern",
					},
					{
						jobType: "Full-time",
					},
					{
						jobType: "Intern",
					},
				];

				const result = store.uniqueJobTypes;

				expect(result).toEqual(new Set(["Intern", "Full-time"]));
			});
		});
		describe("includeJobByOrganization", () => {
			it("returns true if job's organization is in user's selected organizations", () => {
				const jobsStore = useJobsStore();
				const userStore = useUserStore();

				userStore.selectedOrganizations = ["Youtube", "Oracle"];

				const results = jobsStore.includeJobByOrganization({organization: "Youtube", id: 1})
				expect(results).toEqual(true)
			});
			it("returns false if job's organization is not in user's selected organizations", () => {
				const jobsStore = useJobsStore();
				const userStore = useUserStore();

				userStore.selectedOrganizations = ["Google", "Oracle"];

				const results = jobsStore.includeJobByOrganization({organization: "Youtube", id: 1})
				expect(results).toEqual(false)
			});
			it("returns true if no organizations were selected for filtering", () => {
				const jobsStore = useJobsStore();
				const userStore = useUserStore();

				userStore.selectedOrganizations = [];

				const results = jobsStore.includeJobByOrganization({organization: "Youtube", id: 1})
				expect(results).toEqual(true)
					
			});
		});
		describe("includeJobByJobType", () => {
			it("returns true if job's type is in the user's selected job types", () => {
				const jobsStore = useJobsStore();
				const userStore = useUserStore();

				userStore.selectedJobTypes = ["Intern"];

				const results = jobsStore.includeJobByJobType({jobType: "Intern", id: 1})
				expect(results).toEqual(true)

			});
			it("returns false if job's type is not in the user's selected job types", () => {
				const jobsStore = useJobsStore();
				const userStore = useUserStore();

				userStore.selectedJobTypes = ["Full-time"];

				const results = jobsStore.includeJobByJobType({jobType: "Intern", id: 1})
				expect(results).toEqual(false)
			});
			it("returns true if no job types were selected for filtering", () => {
				const jobsStore = useJobsStore();
				const userStore = useUserStore();

				userStore.selectedJobTypes = [];

				const results = jobsStore.includeJobByJobType({jobType: "Intern", id: 1})
				expect(results).toEqual(true)
			});
		});
		describe("filteredJobs", () => {
			describe("when user has not seleected any filters", () => {
				it("returns all jobs", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = Array(20).fill({});

					userStore.selectedOrganizations = [];
					userStore.selectedJobTypes = [];

					const results = jobsStore.filteredJobs;

					expect(results).toHaveLength(20);
				});
			});
			describe("when user selects only organizations filters and no job type filters", () => {
				it("returns jobs filtered by organizations only", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
						{ organization: "Google" },
						{ organization: "Youtube" },
						{ organization: "Samsung" },
					];

					userStore.selectedOrganizations = ["Google", "Samsung"];
					userStore.selectedJobTypes = [];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{ organization: "Google" },
						{ organization: "Samsung" },
					]);
				});
			});
			describe("when user selects only job type filters and no organizations filters", () => {
				it("returns jobs filtered by job types pnly", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
						{ jobType: "Intern" },
						{ jobType: "Full-time" },
						{ jobType: "Temporary" },
					];

					userStore.selectedOrganizations = [];
					userStore.selectedJobTypes = ["Intern", "Temporary"];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{ jobType: "Intern" },
						{ jobType: "Temporary" },
					]);
				});
			});
			describe("When user has selected both organization and job type filters", () => {
				it("computes and returns jobs that match both filters", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
						{ jobType: "Intern", organization: "Google" },
						{ jobType: "Full-time", organization: "Youtube" },
						{ jobType: "Temporary", organization: "Samsung" },
						{ jobType: "Full-time", organization: "Samsung" },
					];

					userStore.selectedOrganizations = ["Google", "Samsung"];
					userStore.selectedJobTypes = ["Intern", "Full-time"];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{ jobType: "Intern", organization: "Google" },
						{ jobType: "Full-time", organization: "Samsung" },
					]);
				});
			});
		});
	});
});
