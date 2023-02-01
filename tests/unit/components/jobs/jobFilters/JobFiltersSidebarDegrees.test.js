import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { createTestingPinia } from "@pinia/testing";
import axios from "axios";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";

import JobFiltersSidebarDegrees from "@/components/jobs/jobFilters/JobFiltersSidebarDegrees.vue";

describe("JobFiltersSidebarDegrees", () => {
	const renderJobFiltersSidebarDegrees = () => {
		const $router = {push: vi.fn()}
		const pinia = createTestingPinia();
		render(JobFiltersSidebarDegrees, {
			global: {
				plugins: [pinia],
				stubs: {
					"font-awesome-icon": true,
				},
				mocks: {
					$router,
				}
			},
		});
		return { $router }
	};
	// beforeEach(() => {
	// 	const
	// });
	it("renders a unique list of degrees in jobs", async () => {
		renderJobFiltersSidebarDegrees();

		const jobsStore = useJobsStore();
		jobsStore.uniqueDegrees = ["Master's", "Ph.D"];
		const button = screen.getByRole("button", {
			name: /degrees/i,
		});

		await userEvent.click(button);

		const list = screen.getAllByRole("listitem");
		const texts = list.map((element) => element.textContent);

		expect(texts).toEqual(["Master's", "Ph.D"]);
	});
	describe("when user clicks clicks on a checkbox", () => {
		it("sends the right message to the user and reroutes the user to the first page of the results", async () => {
			const { $router } = renderJobFiltersSidebarDegrees();

			const jobsStore = useJobsStore();
			const userStore = useUserStore();

			jobsStore.uniqueDegrees = ["Master's", "Ph.D"];
			userStore.sel;
			const button = screen.getByRole("button", {
				name: /degrees/i,
			});

			await userEvent.click(button);

			const checkbox = screen.getByRole("checkbox", {
				name: /master's/i,
			});

			await userEvent.click(checkbox);
			expect(userStore.addSelectedDegrees).toHaveBeenCalledWith(["Master's"]);
			expect($router.push).toHaveBeenCalled()
		});
	});
});
