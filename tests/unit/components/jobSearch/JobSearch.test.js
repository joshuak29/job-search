import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { useRouter } from "vue-router";

import JobSearchForm from "@/components/jobSearch/JobSearchForm.vue";

vi.mock("vue-router");
describe("JobSearchForm", () => {

	describe("when user submits form", () => {
		it("directs user to jobs page with search parameters", async () => {
			const push = vi.fn(); //make a mock function called push
			useRouter.mockReturnValue({push}); //when useRouter is fired it returns an object with the push mock function
			render(JobSearchForm, {
				global: {
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