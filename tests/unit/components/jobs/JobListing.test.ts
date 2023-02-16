import { render, screen } from "@testing-library/vue";
import { RouterLinkStub } from "@vue/test-utils";
import JobListing from "@/components/jobs/JobListing.vue";
import type { Job } from "@/utils/types";
// import createJob from "../../../utils/createJob";

describe("JobListing", () => {
	const renderJobListing = (propsData: Partial<Job>) => {
		render(JobListing, {
			global: {
				stubs: {
					"RouterLink": RouterLinkStub
				},
			},
			props: {
				job: {
					title: "Joshua Rukundo",
					organization: "Cimerwa",
					locations: ["Nyarugenge", "Kicukiro"],
					minimumQualifications: ["Vue Js 3", "SQL"],
					...propsData
				}
			}
		});
	}
	it("renders job title", () => {
		renderJobListing({ title: "Joshua Elise" });
		const title = screen.getByText("Joshua Elise")
		expect(title).toBeInTheDocument();

	})
	it("renders job organization", () => {
		renderJobListing({});

		const title = screen.getByText('Cimerwa');
		expect(title).toBeInTheDocument();

	})
	it("renders job locations", () => {
		renderJobListing({});

		expect(screen.getByText("Nyarugenge")).toBeInTheDocument();
		expect(screen.getByText("Kicukiro")).toBeInTheDocument();
	})
	it("renders job qualifications", () => {
		renderJobListing({});

		expect(screen.getByText("Vue Js 3")).toBeInTheDocument();
		expect(screen.getByText("SQL")).toBeInTheDocument();
	})
})