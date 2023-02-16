import { defineStore } from "pinia";
export interface UserState {
	isLoggedIn: Boolean,
	selectedOrganizations: String[],
	selectedJobTypes: String[],
	selectedDegrees: String[]
};
export const useUserStore = defineStore("user", {
	state: (): UserState => ({
		isLoggedIn: false,
		selectedOrganizations: [],
		selectedJobTypes: [],
		selectedDegrees: [],
	}),
	actions: {
		loginUser() {
			this.isLoggedIn = true;
		},
		addSelectedOrganizations(organizations: String[]) {
			this.selectedOrganizations = organizations;
		},
		addSelectedJobTypes(jobTypes: String[]) {
			this.selectedJobTypes = jobTypes;
		},
		addSelectedDegrees(degrees: String[]) {
			this.selectedDegrees = degrees;
		}
	}
})