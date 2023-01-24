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
			<filter-collapse filter="Whoops" />
			<filter-collapse filter="Contract">
				<div class="mt-5">
					<fieldset>
						<ul class="flex flex-row flex-wrap">
							<li class="w-1/2 h-8">
								<input id="VueTube" type="checkbox" class="mr-3" />
								<label for="VueTube">VueTube</label>
							</li>
							<li class="w-1/2 h-8">
								<input id="between Vue and Me" type="checkbox" class="mr-3" />
								<label for="between Vue and Me">between Vue</label>
							</li>
							<li class="w-1/2 h-8">
								<input id="Et Vue Brute" type="checkbox" class="mr-3" />
								<label for="Et Vue Brute">Et Vue Brute</label>
							</li>
							<li class="w-1/2 h-8">
								<input id="Vue and a Half Men" type="checkbox" class="mr-3" />
								<label for="Vue and a Half Men">Vue and a Half Men</label>
							</li>
						</ul>
					</fieldset>
				</div>
			</filter-collapse>
			<job-filters-sidebar-group />
		</section>
	</div>
</template>
<script>
import GlobalButton from "@/components/shared/GlobalButton.vue";
import FilterCollapse from "@/components/shared/FilterCollapse.vue";
import JobFiltersSidebarGroup from "@/components/jobs/jobFilters/JobFiltersSidebarGroup.vue";


export default {
	name: "JobFiltersSidebar",
	components: {
		GlobalButton,
		FilterCollapse,
		JobFiltersSidebarGroup
	}
}
</script>