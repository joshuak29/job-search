/* const axios = require("axios");
const url = "http://127.0.0.1:3000/jobs";
var data = [];
axios.get(url).then((res) => {
	data = res.data
	console.log(data)
}) */
var nmbrs = ['1', '2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21'];
const page = 2;

console.log(nmbrs.slice((page-1)*10, page*10));
