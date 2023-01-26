<template>
	<div class="h-16 w-full border-b border-solid border-brand-gray-1">
		<div class="flex h-full items-center bg-white px-8">
			<div v-if="onJobTab">
				<font-awesome-icon :icon="['fas', 'search']" class="mr-3" />
				<span
					><span class="text-brand-green-1">{{ filteredJobsByOrganizations.length }}</span> jobs
					matched</span
				>
			</div>
		</div>
	</div>
</template>
<script>
import { useJobsStore } from "@/stores/jobs";
import { mapState } from "pinia";
export default {
	name: "TheSubnav",
	computed: {
		...mapState(useJobsStore, ["filteredJobsByOrganizations"]),
		onJobTab() {
			return this.$route.name === "Jobs";
		},
	}
};
</script>
