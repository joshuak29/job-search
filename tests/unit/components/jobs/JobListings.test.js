import {render, screen} from "@testing-library/vue";

import JobListings from "@/components/jobs/JobListings.vue";
import axios from "axios";

vi.mock("axios"); //turn all axios methods to vitest mocks

describe("JobListings", () => {
	
	
	it("Hits the backend and returns data", () => {
		axios.get.mockResolvedValue({ data: []});
		render(JobListings);
		expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:3000/jobs")
	});
	it("creates a JobListing for every input in data", async () => {
		axios.get.mockResolvedValue({ data: Array(15).fill({}) }); //force to get an asynchronuos data property(mock7ResolvedValue) of an array of length of 15
		render(JobListings);
		
		screen.debug()
		
		const jobs = await screen.findAllByRole('listitem'); //findAll waits for the asynchronous function to return data contrary to getAll that doesn't wait and some times returns without the data
		expect(jobs).toHaveLength(15);
	})
})