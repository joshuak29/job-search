import { render, screen } from "@testing-library/vue";
import { createTestingPinia } from "@pinia/testing";
import userEvent from "@testing-library/user-event";

import { useJobsStore } from "@/stores/jobs";
import { useUserStore } from "@/stores/user";
import JobFiltersSidebarJobTypes from "@/components/jobs/jobFilters/JobFiltersSidebarJobTypes.vue";

describe("JobFiltersSidebarJobTypes", () => {
	const renderJobFiltersSidebarJobTypes = () => {
		const pinia = createTestingPinia();
		render(JobFiltersSidebarJobTypes, {
			global: {
				plugins: [pinia],
				stubs: {
					"font-awesome-icon": true
				}
			},
		});
	}
	it("renders a unique list of job types in jobs", async () => {
		renderJobFiltersSidebarJobTypes();

		const jobsStore = useJobsStore();
		jobsStore.uniqueJobTypes = ["Part-time", "Full-time", "Intern"];

		const button = screen.getByRole("button", {
			name: /job types/i,
		});
		await userEvent.click(button);

		const group = screen.getAllByRole("listitem");

		const texts = group.map((node) => {
			return node.textContent;
		});
		expect(texts).toEqual(["Part-time", "Full-time", "Intern"]);
	});
	describe("when user checks or click a checkbox", () => {
		it("send the right message to the user store", async () => {
			renderJobFiltersSidebarJobTypes();

			const jobsStore = useJobsStore();
			jobsStore.uniqueJobTypes = ["Part-time", "Full-time", "Intern"];

			const button = screen.getByRole("button", {
				name: /job types/i,
			});
			await userEvent.click(button);

			const checkbox = screen.getByRole("checkbox", {
				name: /intern/i,
			});
			await userEvent.click(checkbox);

			const userStore = useUserStore();
			expect(userStore.addSelectedJobTypes).toHaveBeenCalledWith(["Intern"]);
		});
	});
});
