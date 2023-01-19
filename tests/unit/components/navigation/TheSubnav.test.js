import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"   //import userEvent from installed library to stimulate events
import { describe, it, expect } from "vitest";

import TheSubnav from "@/components/navigation/TheSubnav.vue";

describe("TheSubnav", () => {
	const renderTheSubnav = (tabName) => {
		render(TheSubnav, {
			global: {
				mocks: {
				$route: {
					name: tabName
				}
			},
				stubs: {
					FontAwesomIcon: true
				}
			}
		})
	}
	describe("When not on Jobs tab", () => {
		
		it("doesn't display job count", () => {
			renderTheSubnav('Home')
			
			const jobCount = screen.queryByText("2033")
			expect(jobCount).not.toBeInTheDocument();
		})
	})
	describe("When on Jobs tab", () => {
		
		it("displays job count", () => {
			renderTheSubnav('Jobs')
			const jobCount = screen.getByText("2033")
			expect(jobCount).toBeInTheDocument();
		})
	})
})