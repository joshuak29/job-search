<template>
	<filter-collapse filter="Organizations">
		<div class="mt-5">
			<fieldset>
				<ul class="flex flex-row flex-wrap">
					<li
						v-for="organization in uniqueOrganizations"
						:key="organization"
						class="h-8 w-1/2"
					>
						<input
							:id="organization"
							type="checkbox"
							class="mr-3"
							v-model="selectedOrganizations"
							:value="organization"
							@change="selectOrganization"
						/>
						<label :for="organization">{{ organization }}</label>
					</li>
				</ul>
			</fieldset>
		</div>
	</filter-collapse>
</template>
<script>
import FilterCollapse from "@/components/shared/FilterCollapse.vue";
import { mapState, mapActions } from "pinia";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

export default {
	name: "JobFiltersSidebarOrganizations",
	components: {
		FilterCollapse,
	},
	data() {
		return {
			selectedOrganizations: [],
		};
	},
	computed: {
		...mapState(useJobsStore, ["uniqueOrganizations"]),
	},
	methods: {
		...mapActions(useUserStore, ["addSelectedOrganizations"]),
		selectOrganization() {
			this.addSelectedOrganizations(this.selectedOrganizations);
			this.$router.push({name: "Jobs"})
		},
	},
};
</script>
