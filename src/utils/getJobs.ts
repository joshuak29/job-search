import axios from "axios";
import type { Job } from "@/utils/types";

const getJobs = async () => {
	const resource: string =  "jobs";
	const response = await axios.get<Job[]>(`http://127.0.0.1:3000/${resource}`);
	return response.data
};

export default getJobs;

