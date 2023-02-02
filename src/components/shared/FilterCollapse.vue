<template>
	<div class="border-b border-solid border-brand-gray-2 py-5">
		<div
			class="flex cursor-pointer flex-wrap items-center justify-between"
			@click="open"
			role="button"
		>
			<h3 class="text-base font-semibold">{{ filter }}</h3>
			<font-awesome-icon :icon="filterCollapseIcon" />
		</div>
		<transition name="collapse">
			<div v-if="isOpen" class="mt-5 w-full">
				<slot>Unable to load!!</slot>
			</div>
		</transition>
	</div>
</template>
<script setup>
import { ref, computed } from "vue";

const props = defineProps({
	filter: {
		type: String,
		required: true,
	}
});
const isOpen = ref(false);
const open = () => {
	isOpen.value = !isOpen.value;
};

const filterCollapseIcon = computed(() => {
	return isOpen.value ? ["fas", "angle-up"] : ["fas", "angle-down"];
});

</script>
<style scoped>
	.collapse.enter-active, .collapse.leave-active {
		transition: all 2s
	}
	.collapse.enter, .collapse.leave-to {
		display: none
	}
</style>
