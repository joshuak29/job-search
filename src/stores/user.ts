import { defineStore } from "pinia";
import { ref } from "vue";

export interface UserState {
	isLoggedIn: boolean,
	selectedOrganizations: string[],
	selectedJobTypes: string[],
	selectedDegrees: string[],
	searchTerm: string
};
export const useUserStore = defineStore("user", () => {
	const isLoggedIn = ref(false);
	const loginUser = () => {
			isLoggedIn.value = true;
		};

	const searchTerm = ref("");
		const updateSearch = (term: string) => {
			searchTerm.value = term
		}

	const selectedOrganizations = ref<string[]>([]);
	const addSelectedOrganizations = (organizations: string[]) => {
		selectedOrganizations.value = organizations;
	}

	const selectedJobTypes = ref<string[]>([]);
	const addSelectedJobTypes = (jobTypes: string[]) => {
		selectedJobTypes.value = jobTypes;
	};

	const selectedDegrees = ref<string[]>([]);
	const addSelectedDegrees = (degrees: string[]) => {
		selectedDegrees.value = degrees
	};

	const clearFilters = () => {
		selectedDegrees.value = [];
		selectedJobTypes.value = [];
		selectedOrganizations.value = [];
	}

	

	return {isLoggedIn, loginUser, searchTerm, updateSearch,selectedOrganizations, addSelectedOrganizations, selectedJobTypes, addSelectedJobTypes, selectedDegrees, addSelectedDegrees, clearFilters}
	// state: (): UserState => ({
	// 	isLoggedIn: false,
	// 	selectedOrganizations: [],
	// 	selectedJobTypes: [],
	// 	selectedDegrees: [],
	// }),
	// actions: {
	// 	loginUser() {
	// 		this.isLoggedIn = true;
	// 	},
	// 	addSelectedOrganizations(organizations: String[]) {
	// 		this.selectedOrganizations = organizations;
	// 	},
	// 	addSelectedJobTypes(jobTypes: String[]) {
	// 		this.selectedJobTypes = jobTypes;
	// 	},
	// 	addSelectedDegrees(degrees: String[]) {
	// 		this.selectedDegrees = degrees;
	// 	},
	// 	clearFilters() {
	// 		this.selectedDegrees = [];
	// 		this.selectedJobTypes = [];
	// 		this.selectedOrganizations = [];
	// 	}
	// }
})