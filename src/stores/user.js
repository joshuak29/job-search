import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
	state: () => ({
		isLoggedIn: false,
		selectedOrganizations: [],
		selectedJobTypes: [],
		selectedDegrees: [],
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
		addSelectedDegrees(degrees) {
			this.selectedDegrees = degrees;
		}
	}
})