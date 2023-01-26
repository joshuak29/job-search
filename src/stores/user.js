import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: false,
		selectedOrganizations: [],
		selectedJobTypes: []
	}),
	actions: {
		loginUser() {
			this.isLoggedIn = true;
		},
		addSelectedOrganizations(organizations) {
			this.selectedOrganizations = organizations;
		},
		addSelectedJobTypes(jobTypes) {
			this.selectedJobTypes = jobTypes;
		},
	}
})