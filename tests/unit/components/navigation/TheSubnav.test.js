import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event"   //import userEvent from installed library to stimulate events
import { describe, it, expect } from "vitest";
import { RouterLinkStub } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";

import { useJobsStore } from "@/stores/jobs";
import TheSubnav from "@/components/navigation/TheSubnav.vue";

describe("TheSubnav", () => {
	const renderTheSubnav = (routeName) => {
		const pinia = createTestingPinia();
		render(TheSubnav, {
			global: {
				plugins: [pinia],
				mocks: {
					$route: {
						name: routeName
					}
				},
				stubs: {
					FontAwesomeIcon: true,
					RouterLink: RouterLinkStub
				}
			}
		});
	};
	describe("When not on Jobs tab", () => {
		
		it("doesn't display job count", () => {
			renderTheSubnav('Home')
			
			const jobCount = screen.queryByText("2033")
			expect(jobCount).not.toBeInTheDocument();
		})
	})
	describe("When on Jobs tab", () => {
		
		it("displays job count", async () => {
			renderTheSubnav('Jobs');


			const jobsStore = useJobsStore();
			jobsStore.filteredJobsByOrganizations = Array(5).fill({});

			screen.debug()
			// const jobCount = await screen.findByText(5);
			// expect(jobCount).toBeInTheDocument();
			// screen.debug()
		})
	})
})