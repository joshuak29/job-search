import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import FilterCollapse from "@/components/shared/FilterCollapse.vue";

describe("FilterCollapse", () => {
	const renderFilterCollapse = (slot) => {
		render(FilterCollapse, {
			global: {
				stubs: {
					FontAwesomeIcon: true
				},
			},
			props: {
				filter: "Contract"
			},
			slots: slot
		});
	};
	
	it("renders the filter checkboxes", async () => {
		const slot = {default: "<h3>My default slot</h3>"};
		renderFilterCollapse(slot);
		
		expect(screen.queryByText("My default slot")).not.toBeInTheDocument();
		
		const collapse = screen.getByRole("button", { name: /contract/i });
		await userEvent.click(collapse);
		expect(screen.queryByText("My default slot")).toBeInTheDocument();
	});
	describe("when parent doesn't provide filter info", () => {
		it("displays fallback message", async () => {
			const slot = {}
			renderFilterCollapse(slot);
			
			const collapse = screen.getByRole("button", { name: /contract/i });
			await userEvent.click(collapse);
			
			expect(screen.getByText("Unable to load!!")).toBeInTheDocument()
		})
	})
})