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
		describe("uniqueDegrees", () => {
			it("returns a unique set of available degrees from the jobs", () => {
				const jobsStore = useJobsStore();

				jobsStore.jobs = [{degree: "Master's"}, {degree: "PhD"}, {degree: "PhD"}];

				const results = jobsStore.uniqueDegrees;

				expect(results).toEqual(new Set(["Master's", "PhD"]));
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
		describe("includeJobByDegree", () => {
			it("always returns true if user didn't select any degrees for filtering", () => {
				const jobsStore = useJobsStore();
				const userStore = useUserStore();

				userStore.selectedDegrees = [];

				const results = jobsStore.includeJobByDegree({degree: "Master's", id: 1})
				expect(results).toEqual(true)
			});
			it("returns true if degree is included in users's selected degrees", () => {
				const userStore = useUserStore();
				const jobsStore = useJobsStore();

				userStore.selectedDegrees = ["Master's", "Ph.D"];

				const results = jobsStore.includeJobByDegree({degree: "Master's", id: 1});
				expect(results).toEqual(true)

			});
			it("returns false if degree is not included in users's selected degrees", () => {
				const userStore = useUserStore();
				const jobsStore = useJobsStore();
				
				userStore.selectedDegrees = ["Master's", "Ph.D"];

				const results = jobsStore.includeJobByDegree({degree: "Bachelor's", id: 1});
				expect(results).toEqual(false)

			});
		});
		describe("filteredJobs", () => {
			describe("when user has not selected any filters", () => {
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
			describe("when user selects only organizations filters", () => {
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
					userStore.selectedDegrees = [];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{ organization: "Google" },
						{ organization: "Samsung" },
					]);
				});
			});
			describe("when user selects only job type filters", () => {
				it("returns jobs filtered by job types only", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
						{ jobType: "Intern" },
						{ jobType: "Full-time" },
						{ jobType: "Temporary" },
					];

					userStore.selectedDegrees = []
					userStore.selectedOrganizations = [];
					userStore.selectedJobTypes = ["Intern", "Temporary"];

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{ jobType: "Intern" },
						{ jobType: "Temporary" },
					]);
				});
			});
			describe("when user selects only degrees filters", () => {
				it("returns jobs filtered by degrees only", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					userStore.selectedDegrees = ["Associate", "Master's"];
					userStore.selectedJobTypes = []
					userStore.selectedOrganizations = [];

					jobsStore.jobs = [
						{degree: "Associate", organization: "Google"},
						{degree: "Ph.D", organization: "Youtube"},
						{degree: "Master's", jobType: "Intern"},
						{degree: "Ph.D", organization: "Google"},
						{degree: "Master's", jobType: "Temporary"},
					];

					const results = jobsStore.filteredJobs;
					expect(results).toEqual([
							{degree: "Associate", organization: "Google"},
							{degree: "Master's", jobType: "Intern"},
							{degree: "Master's", jobType: "Temporary"},
						]);
				});
			});
			describe("When user has selected filters in more than one category", () => {
				it("computes and returns jobs that match all filters", () => {
					const userStore = useUserStore();
					const jobsStore = useJobsStore();

					jobsStore.jobs = [
						{ jobType: "Intern", organization: "Google", degree: "Master's" },
						{ jobType: "Full-time", organization: "Youtube", degree: "Ph.D" },
						{ jobType: "Temporary", organization: "Samsung", degree: "Master's" },
						{ jobType: "Full-time", organization: "Samsung", degree: "Associate" },
					];

					userStore.selectedOrganizations = ["Google", "Samsung"];
					userStore.selectedJobTypes = ["Intern", "Full-time"];
					userStore.selectedDegrees = ["Ph.d", "Associate"]

					const results = jobsStore.filteredJobs;

					expect(results).toEqual([
						{ jobType: "Full-time", organization: "Samsung", degree: "Associate"},
					]);
				});
			});
		});
	});
});
