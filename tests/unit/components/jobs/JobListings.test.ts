import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";
// import type { Job } from "@/utils/types";
// import createJob from "tests/utils/createJob";

vi.mock("vue-router");

const useRouteMock = useRoute as Mock;

import JobListings from "@/components/jobs/JobListings.vue";
import { useJobsStore } from "@/stores/jobs";

describe("JobListings", () => {
	const renderJobListings = (jobs: number) => {
		const pinia = createTestingPinia();

		const jobsStore = useJobsStore();
		jobsStore.jobs = Array(jobs).fill({});

		render(JobListings, {
			global: {
				plugins: [pinia],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
			data() {
				return {
					pagination: 10,
				};
			},
		});

		return { jobsStore }
	};

	it("Hits the backend and returns data(jobs)", () => {
		useRouteMock.mockReturnValue({ query: {} });

		const { jobsStore } = renderJobListings(1);
		expect(jobsStore.fetchJobs).toHaveBeenCalled();
	});
	it("displays listings equal to the pagination on page", async () => {
		//axios.get.mockResolvedValue({ data: Array(13).fill({}) }); //force to get an asynchronuos data property(mock7ResolvedValue) of an array of length of 13
		useRouteMock.mockReturnValue({ query: {} });

		const { jobsStore } = renderJobListings(10);

		const jobs = await screen.findAllByRole("listitem");
		//findAll waits for the asynchronous function to return data contrary to getAll that doesn't wait and some times returns without the data
		expect(jobs).toHaveLength(10);
	});
	describe("When params exclude page number", () => {
		it("displays page number 1", () => {
			useRouteMock.mockReturnValue({ query: {} });
			renderJobListings(1);

			const pageNmbr = screen.getByText("Page 1");
			expect(pageNmbr).toBeInTheDocument();
		});
	});
	describe("When params include a page number", () => {
		it("dipslays the right page numner", () => {
			useRouteMock.mockReturnValue({ query: { page: "2" } });
			renderJobListings(1);

			const pageNumber = screen.getByText("Page 2");
			expect(pageNumber).toBeInTheDocument();
		});
	});
	describe("When user is neither on the last nor the first page", () => {
		it("show previous button", async () => {
			useRouteMock.mockReturnValue({ query: { page: "2" } });
			const numberOfJobs = 30;
			const { jobsStore } = renderJobListings(numberOfJobs);

			await screen.findAllByRole("listitem");
			const previousButton = screen.queryByRole("link", { name: /Previous/i });

			expect(previousButton).toBeInTheDocument();
		});
		it("show next button", async () => {
			useRouteMock.mockReturnValue({ query: { page: "2" } });
			const numberOfJobs = 30;
			const { jobsStore } = renderJobListings(numberOfJobs);

			await screen.findAllByRole("listitem");
			const nextButton = screen.queryByRole("link", { name: /next/i });
			expect(nextButton).toBeInTheDocument();
		});
	});
	describe("When user is on the first page", () => {
		it("doesn't show the previous button", async () => {
			useRouteMock.mockReturnValue({ query: {} });

			const numberOfJobs = 20;
			const { jobsStore } = renderJobListings(numberOfJobs);

			await screen.findAllByRole("listitem");
			const previousButton = screen.queryByRole("link", { name: /Previous/i });
			expect(previousButton).not.toBeInTheDocument();
		});
	});
	describe("When the user is on the last page", () => {
		it("doesn't show the next button", async () => {
			useRouteMock.mockReturnValue({ query: { page: "10" } });

			const numberOfJobs = 100;
			const { jobsStore } = renderJobListings(numberOfJobs);

			await screen.findAllByRole("listitem");
			const nextButton = screen.queryByRole("link", { name: /NEXT/i });
			expect(nextButton).not.toBeInTheDocument();
		});
	});
});
