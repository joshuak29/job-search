import { render, screen } from "@testing-library/vue";
import {describe, it, expect} from "vitest";

import GlobalButton from "@/components/shared/GlobalButton.vue";

describe("GlobalButton", () => {
	it("renders text", () => {
		render(GlobalButton, {
			props: {
				text: "Click Me",
				type: "primary"
			}
		});
		const button = screen.getByRole('button', {
			name: /click me/i
		});
		expect(button).toBeInTheDocument();
	});
	it("applies a class", () => {
		render(GlobalButton, {
			props: {
				text: "Search",
				type: "secondary"
			}
		})
		const button = screen.getByRole('button', {
			name: /search/i,
		});
		expect(button).toHaveClass("secondary")
	})
	 
	
		
})