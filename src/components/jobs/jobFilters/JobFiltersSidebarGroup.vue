<template>
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
</template>
<script>
import FilterCollapse from "@/components/shared/FilterCollapse.vue";

export default {
	name: "JobFiltersSidebarGroup",
	components: {
		FilterCollapse
	}
}
</script>