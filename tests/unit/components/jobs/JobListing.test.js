import {render, screen} from "@testing-library/vue";
import {RouterLinkStub} from "@vue/test-utils";
import JobListing from "@/components/jobs/JobListing.vue";

describe("JobListing", () => {
	const renderJobListing = () => {
		render(JobListing, {
			global: {
				stubs: {
					"RouterLink": RouterLinkStub
				},
			},
			props: {
				data: {
					title: "Joshua Rukundo",
					organization: "Cimerwa",
					locations: ["Nyarugenge", "Kicukiro"],
					minimumQualifications: ["Vue Js 3", "SQL"]
				}
			}
		});
	}
	it("renders job title", () => {
		renderJobListing();
		const title = screen.getByText("Joshua Rukundo")
		expect(title).toBeInTheDocument();
		
	})
	it("renders job organization", () => {
		renderJobListing();
		
		const title = screen.getByText('Cimerwa');
		expect(title).toBeInTheDocument();
		
	})
	it("renders job locations", () => {
		renderJobListing();
		
		expect(screen.getByText("Nyarugenge")).toBeInTheDocument();
		expect(screen.getByText("Kicukiro")).toBeInTheDocument();
	})
	it("renders job qualifications", () => {
		renderJobListing();
		
		expect(screen.getByText("Vue Js 3")).toBeInTheDocument();
		expect(screen.getByText("SQL")).toBeInTheDocument();
	})
})