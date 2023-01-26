<template>
	<div class="flex flex-col border-r border-solid border-brand-gray-1 bg-white w-96 p-4"
	>
		<section class="pb-5">
			<div class="flex flex-row justify-between">
				<h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
				<div class="flex items-center text-sm">
					<GlobalButton  text="Clear Filters" type="secondary"/>
				</div>
			</div>
			
			<job-filters-sidebar-organizations />
			<job-filters-sidebar-job-types />
		</section>
	</div>
</template>
<script>
import GlobalButton from "@/components/shared/GlobalButton.vue";
import FilterCollapse from "@/components/shared/FilterCollapse.vue";
import JobFiltersSidebarOrganizations from "@/components/jobs/jobFilters/JobFiltersSidebarOrganizations.vue";
import JobFiltersSidebarJobTypes from "@/components/jobs/jobFilters/JobFiltersSidebarJobTypes.vue";


export default {
	name: "JobFiltersSidebar",
	components: {
		GlobalButton,
		FilterCollapse,
		JobFiltersSidebarOrganizations,
		JobFiltersSidebarJobTypes
	}
}
</script>