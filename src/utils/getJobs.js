import axios from "axios";

const getJobs = async (url) => {;
	const response = await axios.get(url);
	return response.data
};

export default getJobs;

