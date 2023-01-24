import { render, screen } from "@testing-library/vue";

import axios from "axios";
import getJobs from "@/utils/getJobs";
vi.mock("axios");

describe("getJobs", () => {
	beforeEach(() => {
		axios.get.mockResolvedValue({
			data: [{
				id:1,
				role: "Vue"
			}]
		})
	})
	it("queries the jobs backend", async () => {
		const url = "http://testapi.com"
		await getJobs(url);
		expect(axios.get).toHaveBeenCalledWith("http://testapi.com");
	});
	it("extracts the jobs from th response", async () => {
		const url = "http://testapi.com";
		const jobs = await getJobs(url);
		expect(jobs).toEqual([{
			id:1,
			role: "Vue"
		}])
	})
})