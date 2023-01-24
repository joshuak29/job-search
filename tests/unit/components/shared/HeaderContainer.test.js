import {render, screen } from "@testing-library/vue";

import HeaderContainer from "@/components/shared/HeaderContainer.vue";

describe("HeaderContainer", () => {
	it("allows parent to provide title content", () => {
		render(HeaderContainer, {
			slots: {
				title: "<h2>The Title</h2>"
			}
		});
		
		expect(screen.getByText("The Title")).toBeInTheDocument();
	});
	it("allows parent to provide subtitle content", () => {
		render(HeaderContainer, {
			slots: {
				subtitle: "<h5>The Subtitle</h5>"
			}
		});
		
		expect(screen.getByText("The Subtitle")).toBeInTheDocument();
	})
})