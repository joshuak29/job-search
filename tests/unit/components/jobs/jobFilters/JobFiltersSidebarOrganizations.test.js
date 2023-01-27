import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";

import JobFiltersSidebarOrganizations from "@/components/jobs/jobFilters/JobFiltersSidebarOrganizations.vue";
import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

describe("JobFiltersSidebarOrganizations", () => {
	const renderJobFiltersSidebarOrganizations = () => {
		const $router = {push: vi.fn()}
		const pinia = createTestingPinia();
		render(JobFiltersSidebarOrganizations, {
			global: {
				plugins: [pinia],
				mocks: {
					$router,
				},
				stubs: {
					"font-awesome-icon": true,
				},
				slots: {
					default: "Joshua",
				},
			},
		});

		return { $router }
	}
	it("renders unique list of organizations from jobs", async () => {
		renderJobFiltersSidebarOrganizations();

		const jobsStore = useJobsStore();
		jobsStore.uniqueOrganizations = new Set(["Yahoo", "Tesla"]);

		const button = screen.getByRole("button", {
			name: /organizations/i,
		});
		await userEvent.click(button);

		const groups = screen.getAllByRole("listitem");
		const organizations = groups.map((node) => node.textContent);
		expect(organizations).toEqual(["Yahoo", "Tesla"]);
	});
	describe("when user clicks on a checkbox", () => {
		it("dispatches the right message to the userStore", async () => {
			renderJobFiltersSidebarOrganizations();

			const userStore = useUserStore();
			const jobsStore = useJobsStore();

			jobsStore.uniqueOrganizations = new Set(["Yahoo"]);

			const button = screen.getByRole("button", {
				name: /organizations/i,
			});
			await userEvent.click(button);

			const checkbox = screen.getByRole("checkbox", {
				name: /yahoo/i,
			});

			await userEvent.click(checkbox);
			expect(userStore.addSelectedOrganizations).toHaveBeenCalledWith([
				"Yahoo",
			]);
		});
		it("reroutes the user to the 1st page of results", async () => {
			const { $router } = renderJobFiltersSidebarOrganizations();

			const jobsStore = useJobsStore();
			jobsStore.uniqueOrganizations = ["Yahoo"];

			const button = screen.getByRole("button", {
				name: /organizations/i,
			});
			await userEvent.click(button);

			const checkbox = screen.getByRole("checkbox", {
				name: /yahoo/i,
			});
			await userEvent.click(checkbox);

			expect($router.push).toHaveBeenCalled();
		});
	});
});
