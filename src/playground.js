const axios = require("axios");
const url = "http://127.0.0.1:3000/jobs";

axios.get(url).then((res) => {
	console.log(res)
})
