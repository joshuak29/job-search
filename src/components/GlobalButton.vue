<template>
	<button :class="buttonClass">{{ text }}</button>
</template>
<script>
export default {
	name: "GlobalButton",
	props: {
		type: {
			type: String,
			required: false,
			default: "primary",
			validator(value) {
				return ['primary', 'secondary'].includes(value);
			}
		},
		text: {
			type: String,
			required: true,
		}
		},
	computed: {
		buttonClass() {
			return {
				[this.type]: true  //if type is primary will return {primary: true}
			}
		}
	}
}
</script>
<style scoped>
button {
	@apply rounded px-5 py-3 font-medium
}
.primary {
	@apply border-0 text-white bg-brand-blue-1 hover:shadow-blue
}
.secondary {
	@apply bg-transparent text-brand-blue-2 hover:bg-brand-blue-1 hover:text-white
}
</style>