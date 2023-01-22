import {render, screen} from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";

import JobListings from "@/components/jobs/JobListings.vue";
import axios from "axios";
// console.log(axios)

vi.mock("axios"); //turn all axios methods to vitest mocks
describe("JobListings", () => {
	const renderJobListings = (query) => {
		render(JobListings, {
			global: {
				mocks: {
					$route: {query: 
								{
									page: "3",
									...query
								} 
							}
				},
				stubs: {
					RouterLink: RouterLinkStub
				}
			},
			data() {
				return {
					pagination: 10,
				}
			}
		});
	}
	
	
	it("Hits the backend and returns data(jobs)", () => {
		axios.get.mockResolvedValue({ data: []});
		
		renderJobListings()
		expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:3000/jobs")
	});
	it("displays a maximum of 10 listings on page", async () => {
		axios.get.mockResolvedValue({ data: Array(13).fill({}) }); //force to get an asynchronuos data property(mock7ResolvedValue) of an array of length of 15
		renderJobListings({page: "1"});
		
		
		const jobs = await screen.findAllByRole('listitem'); //findAll waits for the asynchronous function to return data contrary to getAll that doesn't wait and some times returns without the data
		expect(jobs).toHaveLength(10); 
	});
	describe("When params exclude page number", () => {
		it("displays page number 1", () => {
			renderJobListings({page: null});
			const pageNmbr = screen.getByText("Page 1");
			expect(pageNmbr).toBeInTheDocument();
		});
	})
	describe("When params include a page number", () => {
		it("dipslays the right page numner", () => {
			renderJobListings({page: "2"});
			const pageNumber = screen.getByText("Page 2");
			expect(pageNumber).toBeInTheDocument();
		});

	});
	describe("When user is neither on the last nor the first page", () => {
		it("show previous button", async () => {
			axios.get.mockResolvedValue({ data: Array(30).fill({}) });
			renderJobListings({page: "2"});
			
			await screen.findAllByRole('listitem');
			const previousButton = screen.queryByRole('link', {name: /Previous/i});
			
			expect(previousButton).toBeInTheDocument();
		});
		it("show next button", async () => {
			axios.get.mockResolvedValue({ data: Array(30).fill({}) });
			renderJobListings({page: "2"});
			
			await screen.findAllByRole('listitem');
			const nextButton = screen.queryByRole('link', {name: /next/i});
			expect(nextButton).toBeInTheDocument();
		})
	});
	describe("When user is on the first page", () => {
		it("doesn't show the previous button", async () => {
			axios.get.mockResolvedValue({ data: Array(20).fill({}) });
			renderJobListings({page: "1"});
			
			await screen.findAllByRole('listitem');
			const previousButton = screen.queryByRole('link', {name: /Previous/i});
			expect(previousButton).not.toBeInTheDocument();
		})
	});
	describe("When the user is on the last page", () => {
		it("doesn't show the next button", async () => {
			axios.get.mockResolvedValue({ data: Array(100).fill({}) });
			renderJobListings({page: "10"});
			
			await screen.findAllByRole('listitem');
			const nextButton = screen.queryByRole('link', {name: /NEXT/i});
			expect(nextButton).not.toBeInTheDocument();
		})
	});
	
	
})