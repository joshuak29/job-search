<template>
<div class="border-b border-solid border-brand-gray-2 py-5">
	<div class="flex flex-wrap items-center justify-between cursor-pointer" 
	@click="open()"
	role="button"
	>
		<h3 class="text-base font-semibold">{{ filter }}</h3>
		<font-awesome-icon :icon="filterCollapseIcon" />
	</div>
	
	<div v-if="isOpen" class="mt-5 w-full">
		<slot>Unable to load!!</slot>
	</div>
</div>
</template>
<script>
export default {
	name: "FilterCollapse",
	data() {
		return {
			isOpen: false
		}
	},
	methods: {
		open() {
			this.isOpen = !this.isOpen
		}
	}, 
	computed: {
		filterCollapseIcon() {
			return this.isOpen ? ['fas', 'angle-up'] : ['fas', 'angle-down']
		}
	},
	props: {
		filter: {
			type: String,
			required: true
		}
	}
}
</script>