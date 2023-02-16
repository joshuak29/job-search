// import { render, screen } from "@testing-library/vue";
import type { Mock } from "vitest";

import axios from "axios";
import getJobs from "@/utils/getJobs";
vi.mock("axios");

const axiosGetMock = axios.get as Mock;
describe("getJobs", () => {
	beforeEach(() => {
		axiosGetMock.mockResolvedValue({
			data: [{
				id:1,
				role: "Vue"
			}]
		})
	})
	it("queries the jobs backend", async () => {
		const url = "http://testapi.com"
		await getJobs();
		expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:3000/jobs");
	});
	it("extracts the jobs from th response", async () => {
		// const url = "http://testapi.com";
		const jobs = await getJobs();
		expect(jobs).toEqual([{
			id:1,
			role: "Vue"
		}])
	})
})