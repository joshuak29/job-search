import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";

import JobSearchForm from "@/components/jobSearch/JobSearchForm.vue";

describe("JobSearchForm", () => {
	describe("when user submits form", () => {
		it("directs user to jobs page with search parameters", async () => {
			const push = vi.fn(); //make a mock function called push
			const $router = { push }; //create $router object with push function to replicate the this.$router.push
			render(JobSearchForm, {
				global: {
					mocks: {
						$router: $router,
					},
					stubs: {
						FontAwesomeIcon: true
					}
				}
			});
			const roleInput = screen.getByRole("textbox", {
				name: /role/i
			});
			await userEvent.type(roleInput, "Vue");
			
			const locationInput = screen.getByRole("textbox", {
				name: /where\?/i
			});
			await userEvent.type(locationInput, "USA");
			
			const submitBtn = screen.getByRole("button", {
				name: /search/i
			});
			await userEvent.click(submitBtn);
			
			expect(push).toHaveBeenCalledWith({
				name: "Jobs", 
				query: {
					role: "Vue", 
					where: "USA"
				}
			})
		})
	})
})