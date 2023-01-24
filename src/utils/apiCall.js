import axios from "axios";
const url = import.meta.env.VITE_BASE_URL;

const apiCall = async () => {
	const data = await axios.get(`${url}/jobs`)
	return data.data
};

export default apiCall;
