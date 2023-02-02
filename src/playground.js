const { ref, computed, reactive } = require("vue");

// const num = ref(2);
// const num2 = ref(5);

// const addition = computed(() => {
// 	return num.value + num2.value
// })


// console.log(addition.value)

// num.value = 8

// console.log(addition.value)

// const obj = reactive({name: "joshua", age: 19});

// // console.log(obj.name)

// const reactiveName = computed(() => {
// 	return obj.name
// })

// console.log(reactiveName.value)

// obj.name = "Sammy"

// console.log(reactiveName.value)

let a = ref(23);
let b = ref(32);

const addition = computed(() => {
	return a.value + b.value
})
console.log(addition.value)
a.value = 45
console.log(addition.value)