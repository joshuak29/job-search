import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"   //import userEvent from installed library to stimulate events
import { describe, it, expect } from "vitest";

import TheSubnav from "@/components/navigation/TheSubnav.vue";

describe("TheSubnav", () => {
	describe("When not on Jobs tab", () => {
		it("doesn't display job count", () => {
			render(TheSubnav, {
				global: {
					stubs: {
						FontAwesomeIcon: true  //dont render the icon because vitest is not familiar with the component to stop showing the warning
					}
				},
				data() {
					return {
						onJobTab: false,
					}
				}
			})
			
			const jobCount = screen.queryByText("2033")
			expect(jobCount).not.toBeInTheDocument();
		})
	})
	describe("When on Jobs tab", () => {
		it("displays job count", () => {
			render(TheSubnav, {
				global: {
					stubs: {
						FontAwesomIcon: true
					}
				},
				data() {
					return {
						onJobTab: true,
					}
				}
			})
			const jobCount = screen.getByText("2033")
			expect(jobCount).toBeInTheDocument();
		})
	})
})