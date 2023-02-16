import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import JobFiltersSidebarGroup from "@/components/jobs/jobFilters/JobFiltersSidebarGroup.vue";

describe("JobFiltersSidebarGroup", () => {
	it("displays the title", () => {
		render(JobFiltersSidebarGroup, {
			props: {
				title: "Organizations",
			},
		});

		const title = screen.getByRole("heading", {
			name: /organizations/i,
		});
		expect(title).toBeInTheDocument();
	});
	describe("when user clicks on the filter title", () => {
		it("renders the filters checkboxes", async () => {
			render(JobFiltersSidebarGroup, {
				props: {
					title: "Organizations",
					filters: ["Google", "Youtube"],
				},
			});

			const title = screen.getByRole("heading", {
				name: /organizations/i,
			});
			await userEvent.click(title);

			const group = screen.getAllByRole("checkbox");
			const checkboxes = group.map((node) => node.value);
			expect(checkboxes).toEqual(["Google", "Youtube"]);

		});
		describe("when user selects a filter checkbox",() => {
			it("sends the right message to the store", () => {
				
			});
		});
	});
});
