<template>
	<filter-collapse filter="Degrees">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li v-for="degree in uniqueDegrees" :key="degree" class="h-8 w-1/2">
						<input
							type="checkbox"
							:id="degree"
							v-model="chosenDegrees"
							:value="degree"
							@change="addChosenDegrees"
							class="mr-3"
						/>
						<label :for="degree">{{ degree }}</label>
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
	name: "JobFiltersSidebarDegrees",
	components: { FilterCollapse },
	computed: {
		...mapState(useJobsStore, ["uniqueDegrees"]),
	},
	data() {
		return {
			chosenDegrees: [],
		};
	},
	methods: {
		...mapActions(useUserStore, ["addSelectedDegrees"]),
		addChosenDegrees() {
			this.addSelectedDegrees(this.chosenDegrees);
			this.$router.push({name: "Jobs"})
		},
	},
};
</script>
