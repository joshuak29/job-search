<template>
	<filter-collapse filter="Job Types">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li
						v-for="jobType in uniqueJobTypes"
						:key="jobType"
						class="h-8 w-1/2"
					>
						<input
							:value="jobType"
							v-model="selectedJobTypes"
							:id="jobType"
							type="checkbox"
							class="mr-3"
							@change="selectJobType"
						/>
						<label :for="jobType">{{ jobType }}</label>
					</li>
				</ul>
			</fieldset>
		</div>
	</filter-collapse>
</template>
<script>
import FilterCollapse from "@/components/shared/FilterCollapse.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import { mapState, mapActions } from "pinia";

export default {
	name: "JobFiltersSidebarJobTypes",
	data() {
		return {
			selectedJobTypes: []
		}
		
	},
	components: {
		FilterCollapse,
	},
	computed: {
		...mapState(useJobsStore, ["uniqueJobTypes"]),
	},
	methods: {
		...mapActions(useUserStore, ["addSelectedJobTypes"]),
		selectJobType() {
			this.addSelectedJobTypes(this.selectedJobTypes)
		},
	}
};
</script>
