<template>
	<div class="flex w-full flex-row flex-nowrap">
		<job-filters-sidebar />
		<job-listings />
	</div>
</template>
<script setup lang="ts">
import JobFiltersSidebar from "@/components/jobs/jobFilters/JobFiltersSidebar.vue";
import JobListings from "@/components/jobs/JobListings.vue";

</script>