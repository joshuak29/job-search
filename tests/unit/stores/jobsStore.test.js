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
		describe("filteredJobsByOrganizations", () => {
			it("computes and returns filtered jobs by selected organizations", () => {
				const jobsStore = useJobsStore();
				jobsStore.jobs = [
					{ organization: "Mango" },
					{ organization: "KFC" },
					{ organization: "MTN" },
				];
				const userStore = useUserStore();
				userStore.selectedOrganizations = ["Mango", "KFC"];

				const results = jobsStore.filteredJobsByOrganizations;
				expect(results).toEqual([
					{ organization: "Mango" },
					{ organization: "KFC" },
				]);
			});
			describe("when user hasn't selected any organizations for filtering", () => {
				it("renders all the availbale jobs without regards to filtering", () => {
					const jobsStore = useJobsStore();
					jobsStore.jobs = [
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
					const userStore = useUserStore();
					userStore.selectedOrganizations = [];

					const result = jobsStore.filteredJobsByOrganizations;

					expect(result).toEqual([
						{
							organization: "Youtube",
						},
						{
							organization: "Oracle",
						},
						{
							organization: "Oracle",
						},
					]);
				});
			});
		});
		describe("filteredJobsByJobTypes", () => {
			it("computes and returns jobs that match the jobTypes selected", () => {
				const userStore = useUserStore();
				const jobsStore = useJobsStore();

				jobsStore.jobs = [
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

				userStore.selectedJobTypes = ["Intern"];

				expect(jobsStore.filteredJobsByJobTypes).toEqual([
					{
						jobType: "Intern",
					},
					{
						jobType: "Intern",
					},
				]);
			});
			describe("when user has not selected any filters", () => {
				it("returns all the jobs", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
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

					userStore.selectedJobTypes = [];

					const results = jobsStore.filteredJobsByJobTypes;
					expect(results).toEqual([
						{
							jobType: "Intern",
						},
						{
							jobType: "Full-time",
						},
						{
							jobType: "Intern",
						},
					]);
				});
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
						{organization: "Google"},
						{organization: "Youtube"},
						{organization: "Samsung"},
					]

					userStore.selectedOrganizations = ["Google", "Samsung"];
					userStore.selectedJobTypes = [];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{organization: "Google"},
						{organization: "Samsung"},
					]);
				});
			});
			describe("when user selects only job type filters and no organizations filters", () => {
				it("returns jobs filtered by job types pnly", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
						{jobType: "Intern"},
						{jobType: "Full-time"},
						{jobType: "Temporary"},
					]

					userStore.selectedOrganizations = [];
					userStore.selectedJobTypes = ["Intern", "Temporary"];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{jobType: "Intern"},
						{jobType: "Temporary"},
					]);
				});
			});
			describe("When user has selected both organization and job type filters", () => {
				it("computes and returns jobs that match both filters", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
						{jobType: "Intern", organization: "Google"},
						{jobType: "Full-time", organization: "Youtube"},
						{jobType: "Temporary", organization: "Samsung"},
						{jobType: "Full-time", organization: "Samsung"},
					]

					userStore.selectedOrganizations = ["Google", "Samsung"];
					userStore.selectedJobTypes = ["Intern", "Full-time"];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{jobType: "Intern", organization: "Google"},
						{jobType: "Full-time", organization: "Samsung"},
					]);
				})
			})
		});
	});
});
