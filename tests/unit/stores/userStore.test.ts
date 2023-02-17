import { createPinia, setActivePinia } from "pinia";

import { useUserStore } from "@/stores/user.js";
describe("userStore", () => {
	describe("state", () => {
		beforeEach(() => {
			setActivePinia(createPinia());
		});
		it("keeps track of if user is logged in", () => {
			const store = useUserStore();
			expect(store.isLoggedIn).toBe(false);
		});
		it("keeps track of users choice of organizations to filter by", () => {
			const store = useUserStore();
			expect(store.selectedOrganizations).toEqual([]);
		});
		it("keeps track of users choice of job types to filter by", () => {
			const store = useUserStore();
			expect(store.selectedJobTypes).toEqual([]);
		});
		it("keeps track of users choice of degrees to filter by", () => {
			const store = useUserStore();
			expect(store.selectedDegrees).toEqual([]);
		});
		it("stores the users search term", () => {
			const store = useUserStore();
			expect(store.searchTerm).toEqual("");
		});
	});
	describe("actions", () => {
		describe("loginUser", () => {
			it("logs the user in", () => {
				const store = useUserStore();
				store.loginUser();
				expect(store.isLoggedIn).toBe(true)
			});
		});
		describe("updateSearch", () => {
			it("updates the searchTerm", () => {
				const store = useUserStore();

				store.updateSearch("Joshua");
				expect(store.searchTerm).toEqual("Joshua");
			})
		});
		describe("addSelectedOrganizations", () => {
			it("updates the user's selected filter organizations", () => {
				const store = useUserStore();

				store.addSelectedOrganizations(["Vue", "React"]);
				expect(store.selectedOrganizations).toEqual(["Vue", "React"])
			});
		});
		describe("addSelectedJobTypes", () => {
			it("updates the user's selected filter job types", () => {
				const store = useUserStore();

				store.addSelectedJobTypes(["Full-time", "part-time"]);
				expect(store.selectedJobTypes).toEqual(["Full-time", "part-time"])
			});
		});
		describe("addSelectedDegrees", () => {
			it("updates the user's selected degrees", () => {
				const userStore = useUserStore();

				userStore.addSelectedDegrees(["Master's", "Ph.D"]);
				expect(userStore.selectedDegrees).toEqual(["Master's", "Ph.D"]);
			});
		});
		describe("clearFilters", () => {
			it("resets all the user's chosen filters to empy strings", () => {
			setActivePinia(createPinia());
			
			const userStore = useUserStore();
			userStore.selectedDegrees = Array(10).fill("Degrees");
			userStore.selectedJobTypes = Array(10).fill("JobTypes");
			userStore.selectedOrganizations = Array(10).fill("Organizations");

				userStore.clearFilters();
				expect(userStore.selectedOrganizations).toEqual([]);
				expect(userStore.selectedJobTypes).toEqual([]);
				expect(userStore.selectedDegrees).toEqual([]);
			});
		});
	});
});
